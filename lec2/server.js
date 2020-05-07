const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userDB = {
    alice: 'password',
    bob: 'hunter2'
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname)))

app.get('/', (req, res) => {
    const { username } = req.cookies

    if (username) {
        res.send(`Hi ${username}`)
    }

    fs.createReadStream('index.html').pipe(res)
    // res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (password == userDB[username]) {
        res.cookie('username', username)
        res.send('nice!')
    } else {
        res.send('fail')
    }
})

app.listen(4000)
