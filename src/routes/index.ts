import express from 'express';
import products from './product';

const router = express.Router();

router.use('/products', products);

export default router;
