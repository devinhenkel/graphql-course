const Risk = {
    author(parent, args, {db}, info) {
        return db.users.find((user) => {
            return user.id === parent.author
        })
    },
    project(parent, args, {db}, info) {
        return db.projects.find((project) => {
            return project.id === parent.project
        })
    },
    branch(parent, args, {db}, info) {
        return db.risks.find((risk) => {
            return risk.id === parent.branch
        })
    }
}

export { Risk as default }