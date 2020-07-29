const Project = {
    owner(parent, args, {db}, info) {
        return db.users.find((user) => {
            return user.id == parent.owner
        })
    },
    risks(parent, args, {db}, info) {
        return db.risks.filter((risk) => {
            return risk.project === parent.id
        })
    }
}

export { Project as default }