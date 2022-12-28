import ContainerFileSystem from "../../containers/ContainerFileSystem.js";

class CartsDaoFileSystem extends ContainerFileSystem {
    constructor() {
        super("db/carts.json")
    }

}

export default CartsDaoFileSystem