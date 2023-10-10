import express from 'express';
import orderService from '../services/order'

const router = express.Router();

router.get('/', orderService.getOrders);

router.get('/:id', orderService.getOrder);

router.post('/', orderService.postOrder);

router.put('/:id', orderService.putOrder);

export default router;
