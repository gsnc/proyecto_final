import { v4 as uuidv4 } from 'uuid';

/**
 * id, timestamp, products: [{id:id del producto, quantity:cantidad de veces que se ha agregado el producto al carrito}]
 */

export default class Cart {

    constructor(id, timestamp) {
        this.id = id || uuidv4();
        this.timestamp = timestamp || Date.now();
        this.products = [];
    }

    get = () => {
        return {
            id: this.id,
            timestamp: this.timestamp,
            products: this.products
        }
    }

    addProduct = (pid) => {
        let index = this.products.findIndex(val => val.id === pid);
        if (index < 0) {
            this.products.push({
                id: pid,
                quantity: 1
            });
        } else {
            let q = this.products[index].quantity;
            this.products[index].quantity = q + 1;
        }
        return this.products;
    }

    removeProduct = (pid) => {
        let index = this.products.findIndex(val => val.id === pid);
        console.log("REMOVE PRODUCT index", index);
        let q = this.products[index].quantity;
        console.log("Product quantity", q);

        let removed = this.products[index];
        console.log("Product to remove", removed);

        if (q == 1) {
            this.products.slice(index - 1, 1);
        } else {
            removed.quantity = q - 1;
            console.log(removed.quantity);
        }
        return removed;
    }
}