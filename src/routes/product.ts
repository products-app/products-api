import express from 'express'
import productService from '../services/product'
import { validate } from './middlewares/validate'
import { ProductSchema, PartialProductSchema } from '../schemas/product'

const router = express.Router()

router.get('/', productService.getProducts)

router.get('/:id', productService.getProduct)

router.post('/', validate(ProductSchema), productService.postProduct)

router.put('/:id', validate(PartialProductSchema), productService.putProduct)

export default router
