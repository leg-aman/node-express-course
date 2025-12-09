const express = require('express')
const { products } = require('./data')
const app = express()

app.use(express.static('./public'))

app.get('/api/v1/test', (req, res) => {
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
        } catch(err){
            return res.json({message: "Invalid regular expression!"})
        }
    }
    if(!isNaN(minPrice)){
        result = result.filter(p => p.price >= minPrice)
    }
    if(!isNaN(maxPrice)){
        result = result.filter(p => p.price <= maxPrice)
    }
    if (!isNaN(limit)) {
        result = result.slice(0, limit)
    } else {
        result = result.slice(0, 10)
    }
    
    res.json(result)
})



app.all('*', (req, res) => {
    res.send("This page doesn't exists! "  + req.url)
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))