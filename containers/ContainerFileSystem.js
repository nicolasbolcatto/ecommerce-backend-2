import { promises } from "fs";
import { v4 as uuidv4 } from 'uuid';

class ContainerFileSystem {
    //Defining constructor with file name
    constructor(route) {
        this.route = route
    }

    //Function that saves an object into the file
    async insertItems(object) {
            try {
                //Read file
                const content = await promises.readFile(this.route, 'utf-8')

                //Parse content into object, assign id as last id + 1, and push new item into parsed object
                let existingObjects = JSON.parse(content)
                object.id = existingObjects[existingObjects.length - 1].id + 1
                object.timestamp = new Date().toUTCString()
                object.codigo = uuidv4()
                existingObjects.push(object)

                //Write to file
                await promises.writeFile(`.\\${this.route}`, JSON.stringify(existingObjects, null, 2))
                return object.id //Return new item id
            } catch {

                //If file does not exist, assing id = 1
                object.id = 1
                object.timestamp = new Date().toUTCString()
                object.codigo = uuidv4()
                    //Write to file
                await promises.writeFile(`.\\${this.route}`, "[" + JSON.stringify(object, null, 2) + "]")
                return object.id //Return new item id
            }
        }
    
    //Function that gets object from file by specified id
    async getById(id) {
        try {
            //Read existing file
            const content = await promises.readFile(process.cwd() + '\\' + this.route, 'utf-8')

            //Parse content into object and loop over each item in array to find specific id
            let existingObjects = JSON.parse(content)
            let output = null
            existingObjects.forEach((element) => {
                if (element.id == id) {
                    output = element
                }
            })

            return output
        } catch (error) {
            return `Error while reading file: ${error}`
        }

    }

    //Function that gets all objects from file
    async getAll() {
        try {
            //Read existing file
            const content = await promises.readFile(process.cwd() + '\\' + this.route, 'utf-8')
            return JSON.parse(content)
        } catch (error) {
            return `Error while reading file: ${error}`
        }

    }

    //Function that updates object data from file
    async updateItemById(id, data) {
        try {
            const products = await this.getAll()

            if (products.length >= id) {

                products[id - 1].nombre = data.nombre
                products[id - 1].descripcion = data.descripcion
                products[id - 1].foto = data.foto
                products[id - 1].precio = data.precio
                products[id - 1].stock = data.stock
                products[id - 1].timestamp = new Date().toUTCString()

                await promises.writeFile(process.cwd() + '\\' + this.route, JSON.stringify(products, null, 2))

            } else {
                console.log("No se encontro el producto")
            }
            return products[id - 1]

        } catch (error) {
            console.log(error)
        }


    }

    //Function that deletes object from file by specified id
    async deleteById(id) {
        try {
            //Read existing file
            const content = await promises.readFile(this.route, 'utf-8')

            //Parse content into object and filter out item matching specific id
            let existingObjects = JSON.parse(content)
            let newExistingObjects = existingObjects.filter((element) => element.id !== id)

            //If item with specific id is found, write new items array to file, if not warn by console
            if (JSON.stringify(newExistingObjects) != JSON.stringify(existingObjects)) {

                await promises.writeFile(`.\\${this.route}`, JSON.stringify(newExistingObjects, null, 2))
                return `Successfully written file after deleting item with id = ${id}`

            } else {
                return `No items with id = ${id} were found`
            }
        } catch (error) {
            return `Error while reading file: ${error}`
        }
    }

    //Function that deletes all objects from file
    async deleteAll() {
        try {
            //Read existing file
            await promises.readFile('./productos.txt', 'utf-8')

            //Write empty string to file
            await promises.writeFile('./productos.txt', '')
            return `Successfully deleted all items in ${this.route} file`
        } catch (error) {
            return `Unable to delete all items in ${this.route}. Error: ${error}`
        }
    }

    //Function that adds a cart to the cart's list
    async addCart() {
        try {
            const content = await promises.readFile(this.route, 'utf-8')

            //Parse content into object, assign id as last id + 1, and push new item into parsed object
            let existingObjects = JSON.parse(content)
            const cart = { products: [] }
            cart.id = existingObjects[existingObjects.length - 1].id + 1
            cart.timestamp = new Date().toUTCString()
            existingObjects.push(cart)

            //Write to file
            await promises.writeFile(this.route, JSON.stringify(existingObjects, null, 2))
            return cart

        } catch (error) {
            const cart = { products: [] }
            cart.id = 1
            cart.timestamp = new Date().toUTCString()
            
            //Write to file
            await promises.writeFile(this.route, "[" + JSON.stringify(cart, null, 2) + "]")
            return cart
        }

    }

    //Function that writes cart data into file
    async addItemToCart(product, idCart) {
        const carts = JSON.parse(await promises.readFile(this.route, 'utf-8'))
        for (let item of carts) {
            if (item.id == idCart) {
                item.products.push(product)
            }
        }
        await promises.writeFile(this.route, JSON.stringify(carts, null, 2))
    }

    //Function that deletes item from cart
    async deleteItemFromCart(idProd, idCart){
        try {
            const carts = JSON.parse(await promises.readFile(this.route, 'utf-8'))
            
            for (let item of carts) {
                if (item.id == idCart) {
                    let products = item.products
                    let product = products.filter((element) => element.id === Number(idProd))
                    let modifiedProducts = products.filter((element) => element != product[0])
                    item.products = modifiedProducts
                }
            }
            await promises.writeFile(this.route, JSON.stringify(carts, null, 2))

        } catch (error) {
            console.log(error)
        }
    }
}

export default ContainerFileSystem