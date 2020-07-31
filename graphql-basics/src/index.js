import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import User from './resolvers/User'
import Project from './resolvers/Project'
import Risk from './resolvers/Risk'

import db from './db'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Project,
        Risk
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => {
    console.log('Server is running on http://localhost:4000.')
})