import ContainerMongoDB from "../../containers/ContainerMongoDB.js"
import mongoose from "mongoose"

class ProductsDaoMongoDB extends ContainerMongoDB {
    constructor() {
        super("mongodb+srv://nicobolcatto:x3Q76fnRi0Ahqyoq@cluster0.lm6pupb.mongodb.net/ecommerce?retryWrites=true&w=majority")
        this.model = this.createModel()
    }

    createModel() {
        let schemaStructure = {
            nombre: { type: String, required: true },
            descripcion: { type: String, required: true },
            foto: { type: String, required: true },
            precio: { type: Number, required: true },
            stock: { type: Number, required: true },
            id: { type: Number, required: true, unique: true },
            timestamp: { type: String, required: true },
            codigo: { type: String, required: true }
        }
        let schema = new mongoose.Schema(schemaStructure)
        return mongoose.model("productos", schema)
    }
}



export default ProductsDaoMongoDB