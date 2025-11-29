const http = require('http')
const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.end('<h1>welcome, this is home page!</h1>')
    } else
    if(req.url === '/about'){
        res.end('About page...')
    } else{res.end(`
        <h1>oops!</h1> <p>Page doesn\'t exit.</p> <a href='/'>home</a>
        `)}
    
})

server.listen(3000,() => console.log("server started..."))