import httpStatusCodes from 'http-status-codes'
import request from 'supertest'
import { prismaMock } from '../__mocks__/prisma'
import { products } from '../data/products'
import server from '../../src'

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockReturnValue({ id: 1, isAdmin: true }),
}))

describe('Get all products endpoint', () => {
  test('should return all products correctly', async () => {
    prismaMock.product.findMany.mockResolvedValue(products)

    const { status, body } = await request(server).get('/api/products')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.length).toEqual(3)
  })

  test('should search products correctly', async () => {
    prismaMock.product.findMany.mockResolvedValue(products)

    const { status, body } = await request(server).get(
      '/api/products?search=Product',
    )

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.length).toEqual(3)
  })

  test('should return error in find all products when database returns error', async () => {
    prismaMock.product.findMany.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server).get('/api/products')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})

describe('Get product endpoint', () => {
  test('should find and get a product', async () => {
    prismaMock.product.findUnique.mockResolvedValue(products[0])

    const { status, body } = await request(server).get('/api/products/1')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.name).toEqual('Essencialismo: A disciplinada busca por menos')
  })

  test('should return empty value', async () => {
    prismaMock.product.findUnique.mockResolvedValue(null)

    const { status, body } = await request(server).get('/api/products/1')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body).toEqual({})
  })

  test('should return error in get product when database returns error', async () => {
    prismaMock.product.findUnique.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server).get('/api/products/1')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })

  test('should return bad request when id is invalid', async () => {
    prismaMock.product.findUnique.mockResolvedValue(products[0])

    const { status, body } = await request(server).get('/api/products/aaa')

    expect(status).toBe(httpStatusCodes.BAD_REQUEST)
    expect(body).toEqual({ error_msg: 'id value is invalid' })
  })
})

describe('Post product endpoint', () => {
  test('should create a product', async () => {
    prismaMock.product.create.mockResolvedValue(products[1])

    const { status, body } = await request(server)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(products[1])

    expect(status).toBe(httpStatusCodes.CREATED)
    expect(body.name).toEqual('Mindset: A nova psicologia do sucesso')
  })

  test('should return error in create the product when database returns error', async () => {
    prismaMock.product.create.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .post('/api/products')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(products[1])

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})

describe('Put product endpoint', () => {
  test('should update a product', async () => {
    prismaMock.product.update.mockResolvedValue(products[1])

    const { status, body } = await request(server)
      .put(`/api/products/${products[1].id}`)
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(products[1])

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.name).toEqual('Mindset: A nova psicologia do sucesso')
  })

  test('should return error in create the product when database returns error', async () => {
    prismaMock.product.update.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .put('/api/products/1')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(products[1])

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })

  test('should return bad request when id is invalid', async () => {
    prismaMock.product.update.mockResolvedValue(products[1])

    const { status, body } = await request(server)
      .put(`/api/products/aaa`)
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(products[1])

    expect(status).toBe(httpStatusCodes.BAD_REQUEST)
    expect(body).toEqual({ error_msg: 'id value is invalid' })
  })
})
