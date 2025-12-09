const pList = document.getElementById('productsList')
const url = 'http://localhost:3000/api/v1/products'
const fetchData = () => {
    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            displayProducts(data)
        })

        .catch((error) => {
            console.log(error)
        })

}


function displayProducts(data) {
    data.map((p) => {
        let card = document.createElement('div')
        let imgContainer = document.createElement('div')
        let img = document.createElement('img')
        let price = document.createElement('small')
        let name = document.createElement('h2')
        let desc = document.createElement('small')

        card.className = 'card'
        imgContainer.className = 'card-image-container'


        img.src = `${p.image}`
        price.innerHTML = `$${p.price}`
        name.innerHTML = `${p.name}`
        desc.innerHTML = `${p.desc}`

        card.appendChild(imgContainer)
        imgContainer.appendChild(img)
        card.appendChild(price)
        card.appendChild(name)
        card.appendChild(desc)
        pList.appendChild(card)
    }
    )
}
