import { GraphQLServer } from 'graphql-yoga';
import { v4 as uuidv4 } from 'uuid'
let { users, projects, risks } = require('./demo-data.js')



// type definitions
const typeDefs = `
    type Query {
        me: User!
        users(query: String): [User!]!
        project: Project!
        projects(query: String): [Project!]!
        risks: [Risk!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        updateUser(id: ID!, data: UpdateUserInput!): User!
        deleteUser(id: ID!): User!
        createProject(data: CreateProjectInput!): Project!
        updateProject(id: ID!, data: UpdateProjectInput): Project!
        deleteProject(id: ID!): Project!
    }

    type User {
        id: ID!
        username: String!
        firstname: String
        lastname: String
        email: String!
        age: Int
        projects(active: Boolean): [Project]
        risks: [Risk]
    }

    type Project {
        id: ID!
        name: String!
        description: String
        owner: User!
        active: Boolean!
        risks: [Risk]!
    }

    type Risk {
        id: ID!
        title: String!
        description: String
        author: User!
        project: Project!
        branch: Risk
    }

    type Character {
        name: String!
        height: String
        gender: String
    }

    input CreateUserInput {
        username: String!
        email: String!
    }

    input UpdateUserInput {
        username: String
        email: String
        firstname: String
        lastname: String
        age: Int
    }

    input CreateProjectInput {
        name: String!
        description: String = ""
        active: Boolean = false
        owner: ID!
    }

    input UpdateProjectInput {
        name: String
        description: String
        owner: ID
        active: Boolean
    }
`

// resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: `123`,
                username: 'devinhenkel',
                firstname: 'Devin',
                email: 'devinhenkel@gmail.com'
            }
        },
        users(parent, args, context, info){
            if (!args.query) {
                return users
            }

            return users.filter((user)=>{
                return user.username.toLowerCase().includes(args.query.toLowerCase()) ||
                user.firstname.toLowerCase().includes(args.query.toLowerCase()) ||
                user.lastname.toLowerCase().includes(args.query.toLowerCase())
            })
            
            
        },
        project() {
            return {
                id: `999`,
                name: 'My First Project',
                description: 'My initial project instance',
                active: true
            }
        },
        projects(parent, args, context, info) {
            if (!args.query) {
                return projects
            }

            return projects.filter((project) => {
                return project.name.toLowerCase().includes(args.query.toLowerCase()) ||
                    project.description.toLowerCase().includes(args.query.toLowerCase())
            })
            
        },
        risks(parent, args, context, info) {
            return risks
        }
    },
    Mutation: {
        createUser(parent, args, context, info) {
            const newUser = {
                id: uuidv4(),
                ...args.data
            }
            users.push(newUser)
            return newUser
        
        },
        updateUser(parent, args, context, info) {
            const newUser = {
                ...users.find(user => user.id === args.id),
                ...args.data
            }
            users[users.findIndex(user => user.id === args.id)] = newUser
            return newUser
        
        },
        deleteUser(parent, args, context, info) {
            const userIndex = users.findIndex(user => user.id === args.id)

            if (userIndex === -1) {
                throw new Error('No user with that ID was found.')
            }

            const deletedUser = users.splice(userIndex, 1)
            projects = projects.filter((project) => {
                const match = project.owner === args.id
                if (match) {
                    risks = risks.filter(risk => risk.project !== project.id)
                }
                risks = risks.filter(risk => risk.author !== args.id)
                return !match
            })
            risks = risks.filter(risk => risk.author !== args.id)

            return deletedUser[0]
        },
        createProject(parent, args, context, info) {
            const newProject = {
                id: uuidv4(),
                ...args.data
            }
            projects.push(newProject)
            return newProject
        
        },
        updateProject(parent, args, context, info) {
            const newProject = {
                ...projects.find(project => project.id === args.id),
                ...args.data
            }
            projects[projects.findIndex(project => project.id === args.id)] = newProject
            return newProject
        },
        deleteProject(parent, args, context, info) {
            const projectIndex = projects.findIndex(project => project.id === args.id)

            if (projectIndex === -1) {
                throw new Error('No project with that ID was found.')
            }
            const deletedProject = projects.splice(projectIndex, 1)
            risks = risks.filter(risk => risk.project !== args.id)

            return deletedProject[0]
        }
    },
    Project: {
        owner(parent, args, context, info) {
            return users.find((user) => {
                return user.id == parent.owner
            })
        },
        risks(parent, args, context, info) {
            return risks.filter((risk) => {
                return risk.project === parent.id
            })
        }
    },
    User: {
        projects(parent, args, context, info) {
            return projects.filter((project) => {
                if (args.active == null) {
                    return project.owner === parent.id
                }
                return project.owner === parent.id && project.active === args.active
            })
        },
        risks(parent, args, context, info) {
            return risks.filter((risk) => {
                return risk.author === parent.id
            })
        }
    },
    Risk: {
        author(parent, args, context, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        project(parent, args, context, info) {
            return projects.find((project) => {
                return project.id === parent.project
            })
        },
        branch(parent, args, context, info) {
            return risks.find((risk) => {
                return risk.id === parent.branch
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('Server is running.')
})