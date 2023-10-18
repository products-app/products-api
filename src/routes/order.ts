import express from 'express'
import orderService from '../services/order'
import { validate } from './middlewares/validate'
import { OrderSchema, PartialOrderSchema } from '../schemas/order'

const router = express.Router()

router.get('/', orderService.getOrders)

router.get('/:id', orderService.getOrder)

router.post('/', validate(OrderSchema), orderService.postOrder)

router.put('/:id', validate(PartialOrderSchema), orderService.putOrder)

export default router
