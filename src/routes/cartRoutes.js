import express from "express";
import cartCtrl from "../controllers/cartController.js";

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', () => { console.log("CART GET ALL") });
router.get('/:pid', () => { console.log("CART GET ONE") });
router.post('/', () => { console.log("CART ADD NEW") });
router.put('/:pid', () => { console.log("CART CHANGE ONE") });
router.delete('/:pid', () => { console.log("CART DELETE ONE") });

export default router;