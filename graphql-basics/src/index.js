import { GraphQLServer } from 'graphql-yoga';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import Project from './resolvers/Project'
import Risk from './resolvers/Risk'

import db from './db'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Project,
        Risk
    },
    context: {
        db
    }
})

server.start(() => {
    console.log('Server is running.')
})