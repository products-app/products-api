import express from 'express';
import products from './product';
import users from './user';
import orders from './order';

const router = express.Router();

router.use('/products', products);

router.use('/users', users);

router.use('/orders', orders);

export default router;
