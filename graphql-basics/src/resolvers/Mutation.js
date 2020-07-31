import { v4 as uuidv4 } from 'uuid'

const Mutation = {
    createUser(parent, args, {db}, info) {
        const newUser = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(newUser)
        return newUser
    
    },
    updateUser(parent, args, {db}, info) {  
        if (args.data.email) {
            const emailTaken = db.users.some((user) => args.data.email === user.email)
            if (emailTaken) {
                throw new Error('Email is already in use')
            }
        }

        const newUser = {
            ...db.users.find(user => user.id === args.id),
            ...args.data
        }
        db.users[db.users.findIndex(user => user.id === args.id)] = newUser
        return newUser
    
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex(user => user.id === args.id)

        if (userIndex === -1) {
            throw new Error('No user with that ID was found.')
        }

        const deletedUser = db.users.splice(userIndex, 1)
        db.projects = db.projects.filter((project) => {
            const match = project.owner === args.id
            if (match) {
                db.risks = db.risks.filter(risk => risk.project !== project.id)
            }
            db.risks = db.risks.filter(risk => risk.author !== args.id)
            return !match
        })
        db.risks = db.risks.filter(risk => risk.author !== args.id)

        return deletedUser[0]
    },
    createProject(parent, args, {db}, info) {
        const newProject = {
            id: uuidv4(),
            ...args.data
        }
        db.projects.push(newProject)
        return newProject
    
    },
    updateProject(parent, args, {db}, info) {
        const newProject = {
            ...db.projects.find(project => project.id === args.id),
            ...args.data
        }
        db.projects[db.projects.findIndex(project => project.id === args.id)] = newProject
        return newProject
    },
    deleteProject(parent, args, {db}, info) {
        const projectIndex = db.projects.findIndex(project => project.id === args.id)

        if (projectIndex === -1) {
            throw new Error('No project with that ID was found.')
        }
        const deletedProject = db.projects.splice(projectIndex, 1)
        db.risks = db.risks.filter(risk => risk.project !== args.id)

        return deletedProject[0]
    },
    createRisk(parent, args, {db, pubsub}, info) {
        const newRisk = {
            id: uuidv4(),
            ...args.data
        }
        db.risks.push(newRisk)
        pubsub.publish(`risk-${newRisk.project}`, { risk: newRisk})
        return newRisk
    
    },
    updateRisk(parent, args, {db}, info) {
        const newRisk = {
            ...db.risks.find(risk => risk.id === args.id),
            ...args.data
        }
        db.risks[db.risks.findIndex(risk => risk.id === args.id)] = newRisk
        return newRisk
    },
    deleteRisk(parent, args, {db}, info) {
        const riskIndex = db.risks.findIndex(risk => risk.id === args.id)

        if (riskIndex === -1) {
            throw new Error('No project with that ID was found.')
        }
        const deletedRisk = db.risks.splice(riskIndex, 1)

        return deletedRisk[0]
    }
}

export { Mutation as default }