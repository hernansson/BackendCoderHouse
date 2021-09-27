

const express = require('express')

const app = express()
const { Router } = express
const router = new Router()
const routerProductos = require('./routes/productos')



class Contenedor {
    constructor(fileName) {
        this.filePath = `./${fileName}.txt`
        this.codification = 'utf-8'
    }

    save(obj) {
        try {


            let data = fs.readFileSync(this.filePath, this.codification)
            let dataJSON = JSON.parse(data)
            let lastId;
            dataJSON.length === 0 ? lastId = 0 : lastId = dataJSON[dataJSON.length - 1].id

            const newArr = [...dataJSON, { ...obj, id: lastId + 1 }]
            fs.writeFileSync(this.filePath, JSON.stringify(newArr, null, 2), this.codification)

            return lastId + 1

        }
        catch (err) {
            throw (err)
        }

    }

    getById(number) {
        try {
            let data = fs.readFileSync(this.filePath, this.codification)
            let dataJSON = JSON.parse(data)
            let index = dataJSON.findIndex((e) => e.id === number)

            return index === -1 ? null : dataJSON[index]



        } catch (err) {
            throw (err)
        }
    }

    getAll() {
        try {
            let data = fs.readFileSync(this.filePath, this.codification)

            return JSON.parse(data)



        } catch (err) {
            throw (err)
        }
    }

    deleteById(num) {
        try {
            let data = fs.readFileSync(this.filePath, this.codification)
            let dataJSON = JSON.parse(data)
            let newArr = dataJSON.filter((e => e.id !== num))
            fs.writeFileSync(this.filePath, JSON.stringify(newArr, null, 2), this.codification)


        } catch (err) {
            throw (err)
        }
    }

    deleteAll() {
        try {

            fs.writeFileSync(this.filePath, JSON.stringify([], null, 2), this.codification)
        }
        catch (err) {
            throw (err)
        }
    }



}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



const PORT = process.env.PORT || 8080
const contenedor = new Contenedor("Productos")

router.get("/", (req, res) => {
    res.sendFile((__dirname + '/src/index.html'))

})



app.use('/', router)
app.use('/api/productos', routerProductos)

app.listen(PORT, () => {
    console.log("Server running on port 8080")
})

