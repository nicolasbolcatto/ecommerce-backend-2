import ContainerMongoDB from "../../containers/ContainerMongoDB.js"
import mongoose from "mongoose"

class CartsDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super("mongodb+srv://nicobolcatto:x3Q76fnRi0Ahqyoq@cluster0.lm6pupb.mongodb.net/ecommerce?retryWrites=true&w=majority")
        this.model = this.createModel()
    }

    createModel() {
        let schemaStructure = {
            products: { type: Object, required: true },
            id: { type: Number, required: true },
            timestamp: { type: String, required: true },
        }
        let schema = new mongoose.Schema(schemaStructure)
        return mongoose.model("carritos", schema)
    }

}

export default CartsDaoMongoDB