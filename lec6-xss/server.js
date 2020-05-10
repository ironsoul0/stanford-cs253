const { randomBytes } = require('crypto')
const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const htmlEscape = require('html-escape')

const userDB = {
    alice: 'password',
    bob: 'hunter2'
}

const balances = {
    alice: 500,
    bob: 200
}

const sessions = {} // sessionId -> username

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use((req, res, next) => {
    res.set('X-XSS-Protection', '0')
    next()
})

app.get('/', (req, res) => {
    const { sessionId } = req.cookies
    const source = htmlEscape(req.query.source)

    const username = sessions[sessionId]

    if (username) {
        res.send(`
            Hi ${username}. Your balance is ${balances[username]}.

            <form method='POST' action='/transfer'>
                Send amount:
                <input name='amount' />
                To user:
                <input name='to' />
                <input type='submit' value="Send" />
            </form>
        `)
    } else {
        res.send(`
            <h1>
                ${source ? `Hi ${source} reader!` : ''}
                Login to your bank account:
            </h1>
            <form method='POST' action='/login'>
                Username:
                <input name='username' />
                Password:
                <input name='password' type='password' />
                <input type='submit' value='Login' />
            </form>
        `)
    }

    // fs.createReadStream('index.html').pipe(res)
    // res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (password === userDB[username]) {
        const nextSessionId = randomBytes(16).toString('base64')
        res.cookie('sessionId', nextSessionId, {
            // secure: true,
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        sessions[nextSessionId] = username
        console.log(sessions)
        res.send('nice!')
    } else {
        res.send('fail')
    }
})

app.get('/logout', (req, res) => {
    const sessionId = req.cookies.sessionId
    if (sessionId) delete sessions[sessionId]
    res.clearCookie('sessionId', {
        // secure: true,
        httpOnly: true,
        sameSite: 'lax'
    })
    res.redirect('/')
})

app.post('/transfer', (req, res) => {
    const sessionId = req.cookies.sessionId
    const username = sessions[sessionId]

    if (!username) {
        res.send('Fail')
        return
    }

    const amount = Number(req.body.amount)
    const to = req.body.to

    balances[username] -= amount
    balances[to] += amount

    res.redirect('/')
})

app.listen(4000)
