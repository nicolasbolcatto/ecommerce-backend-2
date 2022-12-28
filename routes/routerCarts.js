import express from "express"
import { daoCarts } from "../daos/index.js"
import { daoProducts } from "../daos/index.js"
const { Router } = express

//Create routers

const routerCarts = Router()

//Create API connections

//POST new cart
routerCarts.post("/", (req, res) => {
    async function pushCart() {
        try {
            const cart = daoCarts.addCart()
            res.json({ added: await cart })
        } catch (error) {
            res.json({ error: `Error: ${error}` })
        }
    }

    pushCart()
})

//DELETE cart by id
routerCarts.delete("/:id", (req, res) => {

    async function deleteCart() {
        try {
            const { id } = req.params
            const cart = await daoCarts.deleteById(Number(id))
            res.json({ deleted: cart })
        } catch (error) {
            res.json({ error: `Error: ${error}` })
        }
    }

    deleteCart()
})

//GET products in cart
routerCarts.get("/:id/productos", (req, res) => {
    try {
        async function getCart() {
            const { id } = req.params
            const cart = await daoCarts.getById(Number(id))
            res.json({ products: cart })
        }
        getCart()
    } catch (error) {
        res.json({ error: `Error: ${error}` })
    }


})

//POST products in cart
routerCarts.post("/:id/productos/:id_prod", (req, res) => {
    try {
        const params = req.params
        const idCart = Number(params.id)
        const idProd = Number(params.id_prod)
        async function postProductToCart() {
            let product = await daoProducts.getById(idProd)
            daoCarts.addItemToCart(product, idCart)
            res.json({ added: product, cartId: `${idCart}` })
        }
        postProductToCart()

    } catch (error) {
        res.json({ error: `Error: ${ error }`})
    }
})

//DELETE products in cart
routerCarts.delete("/:id/productos/:id_prod", (req, res) => {
    const params = req.params
    const idCart = Number(params.id)
    const idProd = Number(params.id_prod)

    async function deleteProductFromCart() {
        try {
            let response = await daoCarts.deleteItemFromCart(idProd, idCart)
            res.json({ deletedIdProd: `${idProd}`, cartId: `${idCart}` })
        } catch (error) {
            res.json({ error: `Error: ${ error }` })
        }
    }

    deleteProductFromCart()
})

export { routerCarts }