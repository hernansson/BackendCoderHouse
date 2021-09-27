const express = require("express")
const bp = require('body-parser')
const { Router } = express;
const routerProductos = new Router()

const prods = [
    {
        "title": "Jabon",
        "price": 300,
        "url": "uraaaal",
        "id": 3
    },
    {
        "title": "Esponja",
        "price": 500,
        "url": "fdsjfsj",
        "id": 4
    },
    {
        "title": "papel higienico",
        "price": 1500,
        "url": "fdsjfsj",
        "id": 5
    },
    {
        "title": "Cebolla",
        "price": 350,
        "url": "fdsjfsj",
        "id": 6
    },
    {
        "title": "Teclado",
        "price": 13590,
        "url": "fdsjfsj",
        "id": 7
    },
    {
        "title": "Caca de bebe",
        "price": 9999,
        "url": "fdsjfsj",
        "id": 8
    },
    {
        "title": "cigarrillo",
        "price": 58,
        "url": "fdsjfsj",
        "id": 9
    }
]
routerProductos.use(bp.json())
routerProductos.get('/', (req, res) => {

    res.status(200).json(prods)
})

routerProductos.get('/:id', (req, res) => {

    const prodId = Number(req.params.id)
    let index = prods.findIndex((e) => e.id === prodId)

    if (index === -1) {
        res.json({ error: 'producto no encontrado' })
    } else {
        res.json(prods[index])
    }

})

routerProductos.post('/', (req, res) => {

    let lastId = prods[prods.length - 1].id + 1
    const newProd = { ...req.body, id: lastId }
    prods.push(newProd)
    console.log(prods)
    res.json(newProd)
})

routerProductos.put('/:id', (req, res) => {

    const prodId = Number(req.params.id)
    let index = prods.findIndex((e) => e.id === prodId)

    if (index === -1) {
        res.json({ error: 'producto no encontrado' })
    } else {

        let { price, title, url } = req.body
        prods[index].price = price
        prods[index].title = title
        prods[index].url = url
        res.json({ message: 'producto actualizado' })
    }
})

routerProductos.delete('/:id', (req, res) => {

    const prodId = Number(req.params.id)

    let index = prods.findIndex((e) => e.id === prodId)

    if (index === -1) {
        res.json({ error: 'producto no encontrado' })
    } else {
        prods.splice(index, 1)
        res.json({ message: 'producto borrado' })
    }

})

module.exports = routerProductos