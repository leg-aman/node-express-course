const laptop = {
    make: 'Hp',
    model: 'Alienware',
    memory: ['SSD', 'HDD'],
    cores: 8,
    memorySize: [256, 512],
    discount: true
}

console.log(`
    Laptop make: ${laptop.make} \n
    model: ${laptop.model} \n
    memory: ${laptop.memory} \n
    cores: ${laptop.cores} \n
    memory size: ${laptop.memorySize} \n
    ${laptop.discount? `on SALE`: '' }
    `)

