
const axios = require('axios');

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
    risks(parent, args, {db}, info) {
        return db.risks
    }
}

export { Query as default }