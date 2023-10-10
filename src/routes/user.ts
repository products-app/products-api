import express from 'express';
import userService from '../services/user'
import userUseCases from '../services/useCases/user_orders'

const router = express.Router();

router.get('/', userService.getUsers);

router.get('/:email', userService.getUser);

router.post('/', userService.postUser);

router.put('/:id', userService.putUser);

router.post('/login', userService.userLogin);

// Use Cases
router.get('/:id/orders', userUseCases.getUserOrders);

export default router;
