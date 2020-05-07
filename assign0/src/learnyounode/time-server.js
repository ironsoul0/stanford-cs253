const net = require('net')

const createDate = () => {
  const myTimezone = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Almaty'
  })
  const now = new Date(myTimezone)
  const current = now.toISOString().replace(/T/, ' ').replace(/\..+/, '')
  return current.substring(0, current.length - 3)
}

const server = net.createServer(socket => {
  socket.write(createDate())
  socket.pipe(socket)
  socket.destroy()
})

server.listen(process.argv[2], '127.0.0.1')
