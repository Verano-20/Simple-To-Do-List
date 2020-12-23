const express = require('express')
const bodyParser = require('body-parser')
const mongoClient = require('mongodb').MongoClient

// Temp user until login is implemented
const user = 'sam'

// Connect to local MongoDB
const dbUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'toDoList'
const dbCollection = 'users'

let dbConnect = new Promise((resolve, reject) => {
  mongoClient.connect(dbUrl, {useUnifiedTopology: true}, (err, client) => {
    if (err) reject(err)
    resolve(client.db(dbName))
    console.log(`Connected to URL: ${dbUrl}\nDatabase: ${dbName}`)
  })
})

// HTTP handlers
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))
const httpPort = 3000

app.listen(httpPort, () => {
  console.log(`Server running on: localhost:${httpPort}`)
})

app.get("/", (req, res) => {
  res.sendFile('/index.html')
})

app.get("/getTasks", (req, res) => {
  dbConnect.then((db) => {
    db.collection(dbCollection).findOne({username: user}, (err, data) => {
      if (err) throw err
      res.send(data.tasks)
    })
  }).catch((err) => {
    console.log(err)
  })
})

app.post("/completedTask", (req, res) => {
  dbConnect.then((db) => {
    db.collection(dbCollection).findOne({username: user}, (err, data) => {
      if (err) throw err
      data.tasks[req.body.task] = (req.body.completed == 'true')
      db.collection(dbCollection).updateOne({username: user}, {$set: data})
    })
  }).catch((err) => {
    console.log(err)
  })
  res.sendStatus(200)
})

app.post("/deleteTask", (req, res) => {
  dbConnect.then((db) => {
    db.collection(dbCollection).findOne({username: user}, (err, data) => {
      if (err) throw err
      delete data.tasks[req.body.task]
      db.collection(dbCollection).updateOne({username: user}, {$set: data})
    })
  }).catch((err) => {
    console.log(err)
  })
  res.sendStatus(200)
})

app.post("/newTask", (req, res) => {
  dbConnect.then((db) => {
    db.collection(dbCollection).findOne({username: user}, (err, res) => {
      if (err) throw err
      res.tasks = Object.assign(req.body, res.tasks)
      db.collection(dbCollection).updateOne({username: user}, {$set: res})
    })
  }).catch((err) => {
    console.log(err)
  })
  res.sendStatus(200)
})
