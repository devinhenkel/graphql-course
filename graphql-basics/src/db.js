// demo data
var users = [
    {
        id: '1',
        username: 'Devin Henkel',
        firstname: 'Devin',
        lastname: 'Henkel-Legare',
        email: 'devin@devinhenkel.com'
    },
    {
        id: '2',
        username: 'lauralegare',
        firstname: 'Laura',
        lastname: 'Legare',
        email: 'lauralegare@live.com'
    },
    {
        id: '3',
        username: 'hopelesscalico',
        firstname: 'Calliope',
        lastname: 'Legare',
        email: 'callie.legare@icloud.com'
    },
    {
        id: '4',
        username: 'brozuni',
        firstname: 'Edison',
        lastname: 'Legare',
        email: 'edison.legare@icloud.com'
    },
    {
        id: '5',
        username: 'mcbattlepanda',
        firstname: 'Emmett',
        lastname: 'Legare',
        email: 'emmett.legare@icloud.com'
    }
]

var projects = [
    {
        id: 'aaa',
        name: 'Project 1',
        description: 'A starter project',
        active: true,
        owner: '1'
    },
    {
        id: 'bbb',
        name: 'Project 2',
        description: 'Another starter project',
        active: false,
        owner: '3'
    },
    {
        id: 'ccc',
        name: 'Manhattan Project',
        description: 'I am become death',
        active: false,
        owner: '1'
    },
    {
        id: 'ddd',
        name: 'Project Runway',
        description: 'I am become fierce',
        active: true,
        owner: '5'
    }
]



var risks = [
    {
        id: '100',
        title: 'Risk 1',
        description: 'Something bad',
        author: '2',
        project: 'bbb',
        branch: null
    },
    {
        id: '200',
        title: 'Risk 2',
        description: 'My spider sense is tingling',
        author: '4',
        project: 'aaa',
        branch: '100'
    },
    {
        id: '300',
        title: 'Risk 3',
        description: 'I got a bad feeling about this',
        author: '1',
        project: 'ccc',
        branch: null
    },
    {
        id: '400',
        title: 'Risk 4',
        description: 'Duck',
        author: '5',
        project: 'ddd',
        branch: '300'
    },
    {
        id: '500',
        title: 'Risk 5',
        description: 'Look out!',
        author: '5',
        project: 'ddd',
        branch: '300'
    }
]

const db = {
    users,
    projects,
    risks
}

export { db as default }