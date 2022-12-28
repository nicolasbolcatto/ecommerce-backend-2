import express from "express"
const { Router } = express
import { daoProducts } from "../daos/index.js"
import { v4 as uuidv4 } from 'uuid';

//Create boolean variable for administrator rights and assign true
let administrador = true

//Create routers

const routerProducts = Router()

//Create API connections

//GET specific product by id or every product

routerProducts.get("/:id?", (req, res) => {
    const { id } = req.params

    async function get() {
        try {
            if (id === undefined) {
                let items = await daoProducts.getAll()
                res.json(items)
            } else {
                try {
                    let item = await daoProducts.getById(Number(id))
                    if (item == null) {
                        res.json({ error: "Product not found" })
                    } else {
                        res.json(item)
                    }

                } catch (error) {
                    res.json({ error: { error } })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    get()

})

//POST new product
routerProducts.post("/", (req, res) => {
    async function pushProduct() {
        try {
            const product = {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                foto: req.body.foto,
                precio: req.body.precio,
                stock: req.body.stock,
                timestamp: new Date().toUTCString(),
                codigo: uuidv4()
            }
            const productId = await daoProducts.insertItems(product)
            product.id = productId
            res.json({ added: product, assignedId: productId })
        } catch (error) {
            res.json({ error: `Error: ${error}` })
        }
    }

    if (!administrador) {
        res.json({ error: -1, descripcion: "Ruta /api/carritos método POST no autorizada" })
        return
    }

    pushProduct()
})

//PUT change details of specific product by id
routerProducts.put("/:id", (req, res) => {


    async function editProduct() {
        try {
            let { id } = req.params
            const data = req.body
            let updatedItem = await daoProducts.updateItemById(Number(id), data)
            res.json({ updated: updatedItem })
            

        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    if (!administrador) {
        res.json({ error: -1, descripcion: `Ruta /api/carritos/${id} método PUT no autorizada` })
        return
    }

    editProduct()
})

//DELETE product by id
routerProducts.delete("/:id", (req, res) => {

    const { id } = req.params

    async function deleteProduct() {
        try {

            const deletedItem = await daoProducts.deleteById(Number(id))

            res.json({ deleted: deletedItem })
        } catch (error) {
            res.json({ error: `Error: ${error}` })
        }
    }

    if (!administrador) {
        res.json({ error: -1, descripcion: `Ruta /api/carritos/${id} método DELETE no autorizada` })
        return
    }
    deleteProduct()
})

export { routerProducts }