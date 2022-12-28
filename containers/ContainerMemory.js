class ContainerMemory {

    constructor(){
        this.products = []
        this.carts = []
    }

    async getProductCount(){
        return this.products.length()
    }

    async insertItems(object){
        this.products.push(object)
    }

    async getProductById(id){
        let output = null
            this.products.forEach((element) => {
                if (element.id == id) {
                    output = element
                }
            })

            return output
    }

    async getAllProducts(){
        return this.products
    }

    async updateItemById(id, data){
        const products = await this.products.getAllProducts()

        if (products.length >= id) {

            products[id - 1].nombre = data.nombre
            products[id - 1].descripcion = data.descripcion
            products[id - 1].foto = data.foto
            products[id - 1].precio = data.precio
            products[id - 1].stock = data.stock
            products[id - 1].timestamp = new Date().toUTCString()
        }
    }   

    async deleteById(id){
        let modifiedProducts = this.products.filter((item) => item.id != id)
        this.products = modifiedProducts
    }

    async deleteAllProducts(){
        this.products = []
    }

    async getCartCount(){
        return this.carts.length()
    }

    async getCartById(id){
        let output = null
            this.carts.forEach((element) => {
                if (element.id == id) {
                    output = element
                }
            })

            return output
    }

    async getAllCarts(){
        return this.carts
    }

    async addCart(){
        const cart = {id: this.getCartCount()+1, timestamp: new Date().toUTCString(), products: [] }
        this.carts.push(cart)
    }

    async deleteAllCarts(){
        this.carts = []
    }

    async addItemToCart(product, idCart){
        for (let item of this.carts) {
            if (item.id == idCart) {
                item.products.push(product)
            }
        }
    }

    async deleteItemFromCart(idProd, idCart){
        for (let item of this.carts) {
            if (item.id == idCart) {
                let products = item.products
                let product = products.filter((element) => element.id === Number(idProd))
                let modifiedProducts = products.filter((element) => element != product[0])
                item.products = modifiedProducts
            }
        }
    }
}

export default ContainerMemory