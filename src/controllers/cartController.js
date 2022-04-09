import Cart from '../models/cart.js'

/**
 * POST: '/' - Crea un carrito VACÍO y devuelve su id.
 * DELETE: '/:cid' - Vacía un carrito y lo elimina.
 * GET: '/:cid/products' - Me permite listar todos los productos guardados en el carrito
 * POST: '/:cid/products' - Para incorporar productos al carrito por su id de producto
 * DELETE: '/:cid/products/:pid' - Eliminar un producto del carrito por su id de carrito y de producto 
 */ 


class CartController {

}

export default new CartController();