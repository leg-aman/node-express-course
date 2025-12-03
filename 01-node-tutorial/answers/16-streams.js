const {createReadStream} = require('fs')
const { encode } = require('punycode')

const stream = createReadStream('../content/big.txt',{encoding:'utf8', highWaterMark:200})
stream.on('data', (result) =>{
    console.log(result)
})

stream.on('error', (err) => console.log(err))