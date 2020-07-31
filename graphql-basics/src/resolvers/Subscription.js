import { PubSub } from "graphql-yoga"

const Subscription = {
    count: {
        subscribe(parent, args, context, info) {
            const { pubsub } = context
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    },
    risk: {
        subscribe(parent, { projectId }, { db, pubsub }, info) {
            const project = db.projects.find((project) => project.id === projectId && project.active === true)
            if(!project) {
                throw new Error(`There is no project with ID ${projectId}`)
            }

            return pubsub.asyncIterator(`risk-${projectId}`)
        }
    }

}

export { Subscription as default }