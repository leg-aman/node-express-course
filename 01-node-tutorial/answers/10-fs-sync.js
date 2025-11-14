const {readFileSync, writeFileSync} = require("fs")

const first = readFileSync('./content/first.txt', 'utf-8')
const second = readFileSync('./content/second.txt', 'utf-8')
const third = 'Hello this is third text line.'

try{
    writeFileSync(
        './content/subfolder/fileA.txt',
        `Here is the result :\n${first}, \n${second}, \n${third}`,
        {flag: 'a'}
    )
} catch (error) {
    console.error('Error:', error.message)
}

const result = readFileSync('./content/subfolder/fileA.txt', 'utf-8')
console.log(result)