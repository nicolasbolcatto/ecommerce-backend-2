import ContainerFileSystem from "../../containers/ContainerFileSystem.js";

class ProductsDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("db/products.json")
    }

}

export default ProductsDaoFileSystem