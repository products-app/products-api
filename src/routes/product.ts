import express from 'express';
import productService from '../services/product'

const router = express.Router();

router.get('/', productService.getProducts);

router.get('/:id', productService.getProduct);

router.post('/', productService.postProduct);

router.put('/:id', productService.putProduct);

export default router;
