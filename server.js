
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')


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

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))

})

app.get("/productos", (req, res) => {
    //res.sendFile(path.join(__dirname + '/index.html'))
    res.send(contenedor.getAll())
})

app.get("/productoRandom", (req, res) => {
    let prods = contenedor.getAll()
    let randomIndex = getRndInteger(0, prods.length - 1)
    res.send(prods[randomIndex])
})


app.listen(PORT, () => {
    console.log("Server running on port 8080")
})

