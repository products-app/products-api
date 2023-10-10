import express from 'express';
import productService from '../services/product'

const router = express.Router();

router.get('/', productService.getProducts);
router.get('/:id', productService.getProduct);

export default router;
