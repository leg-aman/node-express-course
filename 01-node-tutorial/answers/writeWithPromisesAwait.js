const { writeFile, readFile } = require('fs').promises;

const writer = async () => {
    try {
        await writeFile('./content/temp.txt', 'line 1\n')
        await writeFile('./content/temp.txt', 'line 2\n', { flag: 'a' })
        await writeFile('./content/temp.txt', 'line 3\n', { flag: 'a' })
        console.log('Done with writing');
    } catch (err) {
        console.log(err)
    }
}

const reader = async () => {
    try{
        const res =  await readFile('./content/temp.txt', 'utf8')
        console.log(res)
    } catch(err){
        console.log(err)
    }
   
}

const readWrite = async() =>{
    try{
        await writer()
        await reader()
    } catch(err){
        console.log(err)
    }
}
readWrite()