const bodyParser = require('body-parser')
const fs = require('fs')
const express = require('express')
const app = express()

hostname = '127.0.0.1'
port = 3000 

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

app.post("/completedTask", (req, res) => {
  let listData = JSON.parse(fs.readFileSync('list.json'))
  let index = listData.findIndex((item) => item.title === req.body.title)
  listData[index] = req.body
  fs.writeFileSync('list.json', JSON.stringify(listData))
  console.log('Task completion updated successfully.')
  res.sendStatus(200)
})

app.post("/deleteTask", (req, res) => {
  let listData = JSON.parse(fs.readFileSync('list.json'))
  let index = listData.findIndex((item) => item.title === req.body.title)
  listData.splice(index, 1)
  fs.writeFileSync('list.json', JSON.stringify(listData))
  console.log('Task deleted successfully.')
  res.sendStatus(200)
})

app.post("/newTask", (req, res) => {
  let jsonRead = fs.readFileSync('list.json')
  let listData
  if (jsonRead.length > 0) {
    listData = JSON.parse(jsonRead)
    listData.unshift(req.body)
  } else {
    listData = [req.body]
  }
  fs.writeFileSync('list.json', JSON.stringify(listData))
  console.log('Task added successfully.')
  res.sendStatus(200)
})
