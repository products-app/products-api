import express from 'express';
import productController from '../controllers/product'

const router = express.Router();

router.get('/', productController.getProducts);

export default router;
