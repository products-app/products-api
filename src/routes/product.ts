import express from 'express'
import productService from '@/services/product'
import { ProductSchema, PartialProductSchema } from '@/schemas/product'
import { validate } from './middlewares/validate'
import { checkToken } from './middlewares/checkToken'

const router = express.Router()

router.get('/', productService.getProducts)

router.get('/:id', productService.getProduct)

router.post(
  '/',
  [validate(ProductSchema), checkToken({ admin: true })],
  productService.postProduct,
)

router.put(
  '/:id',
  [checkToken({ admin: true }), validate(PartialProductSchema)],
  productService.putProduct,
)

export default router
