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

export default Contenedor;




