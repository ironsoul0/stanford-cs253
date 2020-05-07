const fs = require('fs')
const path = require('path')

const directory = process.argv[2]
const extension = process.argv[3]

const absolutePath = path.resolve(__dirname, directory)

fs.readdir(absolutePath, (_, files) => {
  files.forEach(fileName => {
    if (!fileName.includes('.')) return

    const parts = fileName.split('.')

    if (parts.length > 0 && parts[parts.length - 1] === extension) {
      console.log(fileName)
    }
  })
})
