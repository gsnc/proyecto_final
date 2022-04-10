import { FileMgmt } from '../../utils.js';
import Cart from '../models/cart.js'
import prodCtrl from './productController.js';

/**
 * POST: '/' - Crea un carrito VACÍO y devuelve su id.
 * DELETE: '/:cid' - Vacía un carrito y lo elimina.
 * GET: '/:cid/products' - Me permite listar todos los productos guardados en el carrito
 * POST: '/:cid/products' - Para incorporar productos al carrito por su id de producto
 * DELETE: '/:cid/products/:pid' - Eliminar un producto del carrito por su id de carrito y de producto 
 */


class CartController {

    constructor() {
        this.carts = [];
        const dt = new Date();
        let dd = dt.getDate();
        let mm = dt.getMonth() + 1;
        let yy = dt.getFullYear();
        this.file = new FileMgmt(`carts-${yy}${mm}${dd}.txt`);
        this.file.read().then(savedCarts => {
            savedCarts.forEach(cart => {
                this.carts.push(new Cart(
                    cart.id,
                    cart.timestamp
                ));
            })
            console.log(this.carts);
        });
    }

    createCart = (req, res) => {
        const newCart = new Cart();
        this.carts.push(newCart);
        this.file.save(this.carts);
        return res.send({ status: "OK", response: { cartId: newCart.id } })
    }

    deleteCart = async (req, res) => {
        const cid = req.params.cid;
        if (!cid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        const cix = this.carts.findIndex((cart) => cart.id === cid);
        if (cix < 0) {
            return res.send({ status: "error", message: "Cart not found" })
        }
        const removed = this.carts.splice(cix, 1);
        await this.file.save(this.carts);
        return res.send({ status: "OK", response: removed })
    }

    getProducts = (req, res) => {
        const cid = req.params.cid;
        if (!cid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        const cart = this.carts.find((cart) => cart.id === cid);
        if (cart.length < 1) {
            return res.send({ status: "error", message: "Cart not found" })
        }
        return res.send({ status: "OK", response: cart.products })
    }

    addProducts = async (req, res) => {
        const products = req.body;
        const cid = req.params.cid;
        if (!cid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        const cart = this.carts.find(cart => cart.id === cid);
        if (cart.length < 1) {
            return res.send({ status: "error", message: "Cart not found" })
        }
        const existingProd = prodCtrl.get();
        const nonExisting = [];
        products.forEach(prodId => {
            const pInd = existingProd.findIndex(val => val.id === prodId);
            if (pInd > -1) {
                cart.addProduct(prodId);
            } else {
                nonExisting.push(prodId);
            }
        });
        await this.file.save(this.carts);
        return res.send({ status: "OK", response: { cart: cart.products, error: nonExisting } });
    }

    deleteProduct = async (req, res) => {
        const cid = req.params.cid;
        const pid = req.params.pid;
        if (!cid || !pid) {
            return res.send({ status: "error", message: "Missing id" });
        }
        const cart = this.carts.find(cart => cart.id === cid);
        if (cart.length < 1) {
            return res.send({ status: "error", message: "Cart not found" })
        }
        const removed = cart.removeProduct(pid);
        await this.file.save(this.carts);
        console.log(this.carts);
        return res.send({ status: "OK", response: { removed: removed } });
    }

}

export default new CartController();