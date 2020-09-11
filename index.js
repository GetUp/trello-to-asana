const fs = require('fs')
const csv = require('csv-parser')
const ObjectsToCsv = require('objects-to-csv')

const members = m => ({
    'nirent': 'niren@getup.org.au',
    'tjmcewan': 'tim@getup.org.au',
})[m]

const formatDate = d => d && `${new Date(Date.parse(d)).getMonth() + 1}/${new Date(Date.parse(d)).getDate()}/${new Date(Date.parse(d)).getFullYear()}`

const followers = ms => ms.split(', ').map(members).join(',')

const transform = c => ({
    "Task": c["Card Name"],
    "Task description": c["Card Description"],
    "Section": c["List Name"],
    "Assignee": members(c["Members"].split(', ')[0]),
    "Due date": formatDate(c["Due Date"]),
    "Followers": followers(c["Members"]),
    "Priority": "",
    "Labels": c["Labels"],
})

const listFilter = list => [
    'Prioritise next release'
    , 'Release 2020-06-16 - 16 pts'
    , 'Inbox'
    , 'Blocked'
    , 'Dev'
    , 'Release 2020-06-16'
].includes(list)

const filter = c => c["Archived"] == 'false' && (process.env.TECH == 'true' ? listFilter(c["List Name"]) : true)

const results = []

fs.createReadStream(process.argv.slice(2)[0])
    .pipe(csv())
    .on('data', (data) => filter(data) && results.push(transform(data)))
    .on('end', async () => {
        const csv = new ObjectsToCsv(results)
        await csv.toDisk('./out.csv')
    })
