const fs = require('fs')
const path = require('path')

module.exports = (directory, extension, callback) => {
  const absolutePath = path.resolve(__dirname, directory)
  fs.readdir(absolutePath, (err, files) => {
    if (err) {
      return callback(err)
    }

    const validFiles = files.filter(fileName => {
      if (!fileName.includes('.')) return false

      const parts = fileName.split('.')

      return (parts.length > 0 && parts[parts.length - 1] === extension)
    })

    callback(null, validFiles)
  })
}
