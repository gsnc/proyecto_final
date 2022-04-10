import {v4 as uuidv4} from 'uuid';

export default class Product {

    constructor(title, description, code, thumbnail, price, stock,id,timestamp) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.id = id || uuidv4();
        this.timestamp = timestamp || Date.now();
    }

    get = () => {
        return {
            id: this.id,
            title: this.title,
            code: this.code,
            thumbnail: this.thumbnail,
            price: this.price,
            description: this.description,
            stock: this.stock,
            timestamp: this.timestamp
        }
    }

    getId = () => {
        return this.id;
    }

    set = (prod) => {
         if(prod.title) this.title = prod.title;
         if(prod.code) this.code = prod.code;
         if(prod.thumbnail) this.thumbnail = prod.thumbnail;
         if(prod.price) this.price = prod.price;
         if(prod.description) this.description = prod.description;
         if(prod.stock) this.stock = prod.stock;
         return prod;
    }

}