import { FileMgmt } from "../../utils.js";
import Product from "../models/product.js";

/**
 * GET: '/:pid?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
 * POST: '/' - Para incorporar productos al listado (disponible para administradores)
 * PUT: '/:pid' - Actualiza un producto por su id (disponible para administradores)
 * DELETE: '/:pid' - Borra un producto por su id (disponible para administradores)
 */

class ProductsController {

    constructor() {
        this.products = [];
        const dt = new Date();
        let dd = dt.getDate();
        let mm = dt.getMonth() + 1;
        let yy = dt.getFullYear();
        this.file = new FileMgmt(`products-${yy}${mm}${dd}.txt`);
        this.file.read().then((savedProducts) => {
            savedProducts.forEach(product => {
                this.products.push(new Product(
                    product.title,
                    product.description,
                    product.code,
                    product.thumbnail,
                    product.price,
                    product.stock,
                    product.id,
                    product.timestamp
                ));
            });
            console.log(this.products);
        });
    }

    get = ()=>{
        return this.products;
    }

    getAllProducts = (req, res) => {
        return res.send({ status: "OK", response: this.products });
    }

    getProduct = (req, res) => {
        const pid = req.params.pid;
        if (!pid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        for (let product of this.products) {
            if (product.getId() === pid) return res.send({ status: "OK", response: product });
        }
        return res.send({ status: "error", message: "Product does not exist" })
    }

    addProduct = async (req, res) => {
        const product = req.body;
        if (isNaN(product.price)) {
            return res.send({ status: "error", message: "Price should be a number" })
        }
        if (isNaN(product.stock)) {
            return res.send({ status: "error", message: "Stock should be a number" })
        }
        if (product.title && product.description && product.code && product.thumbnail) {
            let newProduct = new Product(
                product.title,
                product.description,
                product.code,
                product.thumbnail,
                product.price,
                product.stock
            );
            this.products.push(newProduct);
            await this.file.save(this.products);
            return res.send({ status: "OK", response: newProduct });
        } else {
            return res.send({ status: "error", message: "Missing values" })
        }
    }

    updProduct = async (req, res) => {
        const pid = req.params.pid;
        if (!pid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        const product = req.body;

        for (let prod of this.products) {
            if (prod.getId() === pid) {
                prod.set(product);
                await this.file.save(this.products);
                return res.send({ status: "OK", response: prod });
            }
        }
        return res.send({ status: "error", message: "Product does not exist" });
    }

    delProduct = async (req, res) => {
        const pid = req.params.pid;
        if (!pid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        let prodIndex = 0;
        for (let i = 0; i < this.products.length; i++) {
            let product = this.products[i];
            if (product.getId() === pid) {
                prodIndex = i;
                break;
            }
        }
        let removed = this.products.splice(prodIndex, 1);
        await this.file.save(this.products);
        return res.send({ status: "OK", response: removed });
    }

}

export default new ProductsController();