import Product from "../models/product.js";

/**
 * GET: '/:pid?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
 * POST: '/' - Para incorporar productos al listado (disponible para administradores)
 * PUT: '/:pid' - Actualiza un producto por su id (disponible para administradores)
 * DELETE: '/:pid' - Borra un producto por su id (disponible para administradores)
 */

class ProductsController {

    constructor() { this.products = []; }

    getAllProducts = (req, res) => {
        return res.send({ status: "OK", response: this.products });
    }

    getProduct = (req, res) => {
        const id = req.params.pid;
        for (let product of this.products) {
            if (product.getId() === id) res.send({ status: "OK", response: product });
        }
        return res.send({ status: "error", message: "Product does not exist" })
    }

    addProduct = (req, res) => {
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
            return res.send({ status: "OK", response: newProduct });
        } else {
            return res.send({ status: "error", message: "Missing values" })
        }
    }

    updProduct = (req, res) => {
        const id = req.params.pid;
        const product = req.body;

        for (let pr of this.products) {
            if (pr.getId() === id) {
                pr.set(product);
                return res.send({ status: "OK", response: pr });
            };
        }
        return res.send({ status: "error", message: "Product does not exist" });
    }

    delProduct = (req, res) => {
        const id = req.params.pid;
        let prodIndex = 0;
        for (let i = 0; i < this.products.length; i++) {
            let product = this.products[i];
            if (product.getId() === id) {
                prodIndex = i;
                break;
            }
        }
        let removed = this.products.splice(prodIndex-1, 1);
        return res.send({ status: "OK", response: removed });
    }

}

export default new ProductsController();