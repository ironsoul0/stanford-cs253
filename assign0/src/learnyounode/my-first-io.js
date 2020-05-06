const fs = require('fs');

const filePath = process.argv[2];

const buffer = fs.readFileSync(filePath);
const contents = buffer.toString();

console.log(contents.split('\n').length - 1);
