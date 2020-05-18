const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')

const COMMAND = 'open /Applications/Numbers.app'

const app = express()

app.use(express.json())

app.put('/', (req, res) => {
    console.log(req.headers)
    // res.set('Access-Control-Allow-Origin', '*')
    exec(COMMAND, err => {
        if (err) {
            res.status(500).send(err.stack)
        } else {
            res.status(200).send('Success')
        }
    })
})

app.post('/', (req, res) => {
    console.log(req.body)
    exec(COMMAND, err => {
        if (err) {
            res.status(500).send(err.stack)
        } else {
            res.status(200).send('Success')
        }
    })
})

app.listen(4000)
