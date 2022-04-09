import express from 'express';
import __dirname from './utils.js';
import productRoutes from './src/routes/productRoutes.js';
import cartRoutes from './src/routes/cartRoutes.js';


const PORT = process.env.PORT || '8080';
const app = express();

app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);