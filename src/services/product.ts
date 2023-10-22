import httpStatusCodes from 'http-status-codes'
import { Request, Response } from 'express'
import {
  findProducts,
  getProductByID,
  createProduct,
  updateProduct,
} from '@/repositories/product'

const getProducts = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Products']
  */
  const searchValue = req.query.search
    ? req.query.search?.toString()
    : undefined

  try {
    const products = await findProducts(searchValue)

    res.status(httpStatusCodes.OK)
    res.json(products)
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

const getProduct = async (req: Request, res: Response) => {
  // #swagger.tags = ['Products']
  const id = parseInt(req.params.id, 10)

  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST)
    res.json({ error_msg: 'id value is invalid' })
    return
  }

  try {
    const product = await getProductByID(id)

    res.status(httpStatusCodes.OK)
    res.json(product || {})
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

const postProduct = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.security = [{
      "authorization": []
    }]
    #swagger.parameters['obj'] = {
      in: 'body',
      schema: { $ref: '#/components/schemas/product' }
    }
  */
  try {
    const created = await createProduct(req.body)

    res.status(httpStatusCodes.CREATED).json(created).send()
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

const putProduct = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Products']
    #swagger.security = [{
      "authorization": []
    }]
    #swagger.parameters['obj'] = {
      in: 'body',
      schema: { $ref: '#/components/schemas/product' }
    }
  */
  const id = parseInt(req.params.id, 10)

  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST)
    res.json({ error_msg: 'id value is invalid' })
    return
  }

  try {
    const updated = await updateProduct(id, req.body)

    res.status(httpStatusCodes.OK).json(updated).send()
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

export default {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
}
