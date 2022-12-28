import CartsDaoFileSystem from "./carts/CartsDaoFileSystem.js"
import CartsDaoMongoDB from "./carts/CartsDaoMongoDB.js"
import CartsDaoFirebase from "./carts/CartsDaoFirebase.js"
import CartsDaoMemory from "./carts/CartsDaoMemory.js"
import ProductsDaoFileSystem from "./products/ProductsDaoFileSystem.js"
import ProductsDaoFirebase from "./products/ProductsDaoFirebase.js"
import ProductsDaoMongoDB from "./products/ProductsDaoMongoDB.js"
import ProductsDaoMemory from "./products/ProductsDaoMemory.js"

//Here the file system should be selected
export const daoProducts = new ProductsDaoFirebase()
export const daoCarts = new CartsDaoFirebase()

//Only for MongoDB
//daoProducts.connect()
//daoCarts.connect()

