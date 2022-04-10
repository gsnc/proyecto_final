import express from "express";
import cartCtrl from "../controllers/cartController.js";

const router = express.Router();

router.post('/', cartCtrl.createCart);
router.delete('/:cid', cartCtrl.deleteCart);
router.get('/:cid/products', cartCtrl.getProducts);
router.post('/:cid/products', cartCtrl.addProducts);
router.delete('/:cid/products/:pid', cartCtrl.deleteProduct);

export default router;