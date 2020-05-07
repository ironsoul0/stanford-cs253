const net = require('net')
const dns = require('dns')

dns.lookup('example.com', (err, address) => {
    if (err) throw err

    const socket = net.createConnection({ // Opening a TCP socket
        host: address,
        port: 80
    })

    const request = ['GET / HTTP/1.1', 'Host: example.com', '', ''].join('\n')

    socket.write(request)
    socket.pipe(process.stdout)
})

