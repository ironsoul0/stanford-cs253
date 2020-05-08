const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const COOKIE_SECRET = 'ksfsdfinsfisnifsifsinfn'

const userDB = {
    alice: 'password',
    bob: 'hunter2'
}
const balances = {
    alice: 500,
    bob: 100
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET))

// app.use(express.static(path.resolve(__dirname)))

app.get('/', (req, res) => {
    const { username } = req.signedCookies

    if (username) {
        const balance = balances[username];
        return res.send(`Hi ${username}. Your balance is $${balance}`)
    }

    fs.createReadStream('index.html').pipe(res)
    // res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (password == userDB[username]) {
        res.cookie('username', username, { signed: true })
        res.send('nice!')
    } else {
        res.send('fail')
    }
})

app.get('/logout', (req, res) => {
    res.clearCookie('username')
    res.redirect('/')
})

app.listen(4000)
