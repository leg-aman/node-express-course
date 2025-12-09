const { log } = require('console')
const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('order-pizza',(size, topping) => {
    console.log(`Order received! Baking a ${size} pizza with ${topping}`)
})

emitter.on('order-pizza',(size) => {
    if(size === 'large'){
        console.log('serving complentary drink.')
    }
})
console.log('Do work before event occurs!')
emitter.emit('order-pizza', 'large', 'mushrooms')