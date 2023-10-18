import express from 'express'
import { OrderSchema, PartialOrderSchema } from '@/schemas/order'
import orderService from '@/services/order'
import { validate } from './middlewares/validate'
import { checkToken } from './middlewares/checkToken'

const router = express.Router()

router.get('/', checkToken({ admin: false }), orderService.getOrders)

router.get('/:id', checkToken({ admin: false }), orderService.getOrder)

router.post(
  '/',
  [validate(OrderSchema), checkToken({ admin: false })],
  orderService.postOrder,
)

router.put(
  '/:id',
  [validate(PartialOrderSchema), checkToken({ admin: false })],
  orderService.putOrder,
)

export default router
