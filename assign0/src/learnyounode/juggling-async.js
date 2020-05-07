const http = require('http')

const urls = [], contents = []

for (let i = 2; i < process.argv.length; i++) {
    urls.push(process.argv[i])
    contents.push(null)
}

let ended = 0

for (let i = 0; i < urls.length; i++) {
    http.get(urls[i], (response) => {
        let data = ''

        response.on('data', chunk => {
            data += chunk
        })

        response.on('end', () => {
            contents[i] = data
            ended++
            if (ended == urls.length) {
                for (let j = 0; j < ended; j++)
                    console.log(contents[j])
            }
        })
    });
}
