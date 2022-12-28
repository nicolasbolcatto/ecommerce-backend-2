import express, { json, urlencoded } from "express"
import { routerProducts } from "./routes/routerProducts.js"
import { routerCarts } from "./routes/routerCarts.js"

//Start express app
const app = express()

//Configure app for json
app.use(json())
app.use(urlencoded({ extended: true }))


//Use routers
app.use("/api/productos", routerProducts)
app.use("/api/carritos", routerCarts)


//Start listening to server
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server listening in port ${8080}`)
})

//Indicate error if server fails
server.on("error", error => console.log(`Error on server: ${error}`))