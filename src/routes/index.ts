import express from 'express';
import products from './product';
import user from './user';

const router = express.Router();

router.use('/products', products);

router.use('/users', user);

export default router;
