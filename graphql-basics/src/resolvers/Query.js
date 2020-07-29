const Query = {
    me() {
        return {
            id: `123`,
            username: 'devinhenkel',
            firstname: 'Devin',
            email: 'devinhenkel@gmail.com'
        }
    },
    users(parent, args, {db}, info){
        if (!args.query) {
            return db.users
        }

        return db.users.filter((user)=>{
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
    projects(parent, args, {db}, info) {
        if (!args.query) {
            return db.projects
        }

        return db.projects.filter((project) => {
            return project.name.toLowerCase().includes(args.query.toLowerCase()) ||
                project.description.toLowerCase().includes(args.query.toLowerCase())
        })
        
    },
    risks(parent, args, {db}, info) {
        return db.risks
    }
}

export { Query as default }