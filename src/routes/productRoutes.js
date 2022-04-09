import express from "express";
import prodCtrl from "../controllers/productController.js";

const router = express.Router();
const admin = false;

router.get('/', prodCtrl.getAllProducts);
router.get('/:pid', prodCtrl.getProduct);

router.use((req,res,next)=>{
    console.log('Time: ', Date.now());
    const unauthorizedResponse = { error : -1, descripcion: `ruta '${req.originalUrl}' método '${req.method}' no autorizada` }
    if (!admin) return res.status(401).send(unauthorizedResponse);
    next();
});

router.post('/', prodCtrl.addProduct);
router.put('/:pid', prodCtrl.updProduct);
router.delete('/:pid', prodCtrl.delProduct);

export default router;