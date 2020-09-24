import { GraphQLServer } from 'graphql-yoga';
const axios = require('axios');

// type definitions
const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        starwars(id: Int): Character!
        me: User!
        grades(index: Int): [Int!]!
        project: Project!
        ronswanson: String!
    }

    type User {
        id: ID!
        username: String!
        firstname: String
        lastname: String
        email: String!
        age: Int
    }

    type Project {
        id: ID!
        name: String!
        description: String
    }

    type Character {
        name: String!
        height: String
        gender: String
    }
`

// resolvers
const resolvers = {
    Query: {
        add(parent, {numbers}, context, info) {
        },
                return numbers.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue
                })
        me() {
            return {
                id: `123`,
                username: 'devinhenkel',
                firstname: 'Devin',
                email: 'devinhenkel@gmail.com'
            }
        },
        project() {
            return {
                id: `999`,
                name: 'My First Project',
                description: 'My initial project instance'
            }
        },
        grades(parent, args, context, info){
            var grades = [10,33,12,76,84,99]
            if (args.index !== null && args.index > -1 && args.index < grades.length) {
                return [grades[args.index]]
            }
            return grades
        },
        async ronswanson() {
            const rsurl = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes'
            var quote = ''
            await axios.get(rsurl)
            .then(function(res){
                console.log(res.data[0])
                quote = res.data[0]
            })
            .catch(function(err){
                quote = 'Error!'
                if (err.response){
                console.log("Problem with response", err.response.status);
                } else if (err.request) {
                console.log("Problem with request");
                } else {
                console.log("Error: ", err.message);
                }
            })
            return quote
        },
        async starwars(parent, {id}) {
            const rsurl = `https://swapi.dev/api/people/${id}/`
            var character = ''
            await axios.get(rsurl)
            .then(function(res){
                console.log(res.data)
                character = { name: res.data['name'], height: res.data['height'], gender: res.data['gender'] }
            })
            .catch(function(err){
                character = 'Error!'
                if (err.response){
                console.log("Problem with response", err.response.status);
                } else if (err.request) {
                console.log("Problem with request");
                } else {
                console.log("Error: ", err.message);
                }
            })
            return character
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