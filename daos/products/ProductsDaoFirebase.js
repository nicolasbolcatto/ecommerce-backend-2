import ContainerFirebase from "../../containers/ContainerFirebase.js"

class ProductsDaoFirebase extends ContainerFirebase {
    constructor() {
        super("productos")
    }

}

export default ProductsDaoFirebase