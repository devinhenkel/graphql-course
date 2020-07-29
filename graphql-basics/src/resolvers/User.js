const User = {
    projects(parent, args, {db}, info) {
        return db.projects.filter((project) => {
            if (args.active == null) {
                return project.owner === parent.id
            }
            return project.owner === parent.id && project.active === args.active
        })
    },
    risks(parent, args, {db}, info) {
        return db.risks.filter((risk) => {
            return risk.author === parent.id
        })
    }
}

export { User as default }