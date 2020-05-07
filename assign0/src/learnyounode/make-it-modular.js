const reader = require('./mymodule')

const directory = process.argv[2]
const extension = process.argv[3]

reader(directory, extension, (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
