const cookieParser = require('cookie-parser')
const express = require('express')
const { products, people } = require('./data')
const log = console.log
const app = express()
const peopleRouter = require('./routes/people')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())

// Auth Middleware
function auth(req, res, next) {
    if (req.cookies.name) {
        req.user = req.cookies.name;
        next();
    } else {
        return res.status(401).json({ success: false, message: "unauthorized" });
    }
}

app.get('/', (req, res, next) => {
    log('logged!')
    next()
})

// logon/ login route
app.post('/logon', (req,res) => {
    const name = req.body.name
    if(!name){
        return res.status(400).json({success: false, message: "Name is required!"})
    }
    res
        .status(201)
        .cookie('name', name)
        .json({success: true, message:'Hello ' + name} )
})

// logoff/ logout route
app.delete('/logoff', (req,res) => {
    res.clearCookie('name').status(200)
    .json({success: true, message: 'you are logged off!'})
})

// test route / requires authentication
app.get('/test', auth, (req,res) => {
    res.status(200).json({success: true, message: 'Welcome ' + req.user})
})

app.use(express.static('./public'))

app.use('/api/v1/people', peopleRouter)

app.get('/api/v1/test', (req, res) => {
    log(req)
    res.json({ message: 'It worked!' })
})

app.get('/api/v1/products', (req, res) => {
    res.json(products)
})

app.get('/api/v1/products/:productID', (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.productID))
    if (product === undefined)
        res.json("product not found!")
    res.json(product)
})

// /api/v1/query?search=al&limit=5
app.get('/api/v1/query', (req, res) => {
    const s = req.query.search
    const limit = parseInt(req.query.limit)
    const maxPrice = parseFloat(req.query.maxPrice)
    const minPrice = parseFloat(req.query.minPrice)
    let result = products
    if (s && s.trim() !== '') {
        try {
            const regex = new RegExp(s, 'i')
            result = result.filter(p => regex.test(p.name))
        } catch (err) {
            return res.status(404).json({ message: "Invalid regular expression!" })
        }
    }
    if (!isNaN(minPrice)) {
        result = result.filter(p => p.price >= minPrice)
    }
    if (!isNaN(maxPrice)) {
        result = result.filter(p => p.price <= maxPrice)
    }
    if (!isNaN(limit)) {
        result = result.slice(0, limit)
    } else {
        result = result.slice(0, 10)
    }

    res.json(result)
})

// people
// app.get('/api/v1/people', (req, res) => {
//     res
//         .status(200)
//         .json({ success: true, data: people })
// })

// app.post('/api/v1/people', (req, res) => {
//     const {name} = req.body;
    
//     if (!name || name.trim().length === 0 ) {
//         res.status(400).json({ success: false, message: "please provide a name." });
//     } else {
      
//         people.push({ id: people.length + 1, name: req.body.name });
//         res.status(201).json({ success: true, name: req.body.name });
//     }
// });



app.all('*', (req, res) => {
    res.status(404).send("This page doesn't exists! " + req.url)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))