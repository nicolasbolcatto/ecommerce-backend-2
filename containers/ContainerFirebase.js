import admin from "firebase-admin";
import serviceAccount from "../db/firebase/ecommerce-backend-d30a3-firebase-adminsdk-rh2nv-71deb8c332.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
import { v4 as uuidv4 } from 'uuid';

class ContainerFirebase {
    constructor(collection) {
        this.collection = collection
        this.db = admin.firestore()
    }

    //Function that saves an object into the file
    async insertItems(object) {
        try {
            const query = this.db.collection(this.collection)
            const doc = query.doc()
            const count = (await query.count().get()).data().count
            object.id = count + 1
            object.timestamp = new Date().toUTCString()
            object.codigo = uuidv4()
            await doc.create(object)
        } catch (error) {
            console.log(error)
        }
    }

    //Function that gets object from file by specified id
    async getById(id) {
        try {
            const query = this.db.collection(this.collection)
            const snapshot = await query.where('id', '==', id).get()
            let docs = snapshot.docs
            const response = docs.map((doc) => ({
                id: doc.data().id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock,
                codigo: doc.data().codigo,
                timestamp: doc.data().timestamp
            }))
            return response
        } catch (error) {
            console.log(error)
        }
    }

    //Function that gets all objects from file
    async getAll() {
        try {
            const query = this.db.collection(this.collection)
            const snapshot = await query.get()
            let docs = snapshot.docs
            const response = docs.map((doc) => ({
                id: doc.data().id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                foto: doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock,
                codigo: doc.data().codigo,
                timestamp: doc.data().timestamp
            }))
            return response
        } catch (error) {
            console.log(error)
        }
    }

    //Function that updates object data from file
    async updateItemById(id, data) {

        const query = this.db.collection(this.collection)
        const snapshot = await query.where('id', '==', id).get()
        snapshot.forEach(doc => {
            query.doc(doc.id).set(data, { merge: true })
        });
        data.id = id
        return data
    }

    //Function that deletes object from file by specified id
    async deleteById(id) {
        const query = this.db.collection(this.collection)
        const snapshot = await query.where("id", "==", id).get();
        snapshot.forEach(doc => {
            query.doc(doc.id).delete()
        });
        return { id: id }
    }

    //Function that deletes all objects from file
    async deleteAll() {
        const query = this.db.collection(this.collection)
        const snapshot = await query.get()
        snapshot.forEach(doc => {
            query.doc(doc.id).delete()
        });
    }

    //Function that adds a cart to the cart's list
    async addCart() {
        const query = this.db.collection(this.collection)
        const doc = query.doc()
        const count = (await query.count().get()).data().count
        let object = { products: [] }
        object.id = count + 1
        object.timestamp = new Date().toUTCString()
        await doc.create(object)
        return { id: object.id }
    }

    //Function that writes cart data into file
    async addItemToCart(item, idCart) {
        const query = this.db.collection(this.collection)
        const snapshot = await query.where('id', '==', idCart).get()
        snapshot.forEach(doc => {
            let products = doc.data().products
            products.push(item[0])
            query.doc(doc.id).set( {products} , { merge: true })
        });
    }

    //Function that deletes item from cart
    async deleteItemFromCart(idProd, idCart) {
        const query = this.db.collection(this.collection)
        const snapshot = await query.where('id', '==', idCart).get()
        snapshot.forEach(doc => {
            let originalProducts = doc.data().products
            let product = originalProducts.filter((element) => element.id === Number(idProd))
            let products = originalProducts.filter((element) => element != product[0])
            query.doc(doc.id).set({ products }, { merge: true })
        });
    }

}

export default ContainerFirebase