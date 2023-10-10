import express from 'express';
import userService from '../services/user'

const router = express.Router();

router.get('/', userService.getUsers);

router.get('/:email', userService.getUser);

router.post('/', userService.postUser);

router.put('/:id', userService.putUser);

router.post('/login', userService.userLogin);

export default router;
