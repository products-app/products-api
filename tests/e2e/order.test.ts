import httpStatusCodes from 'http-status-codes'
import request from 'supertest'
import { prismaMock } from '../__mocks__/prisma'
import { orders } from '../data/orders'
import server from '../../src'

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockReturnValue({ id: 1, isAdmin: true }),
}))

describe('Get all orders endpoint', () => {
  test('should return all orders correctly', async () => {
    prismaMock.order.findMany.mockResolvedValue(orders)

    const { status, body } = await request(server)
      .get('/api/orders')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.length).toEqual(1)
  })

  test('should return error in find all orders when database returns error', async () => {
    prismaMock.order.findMany.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .get('/api/orders')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})

describe('Get order endpoint', () => {
  test('should find and get an order', async () => {
    prismaMock.order.findUnique.mockResolvedValue(orders[0])

    const { status, body } = await request(server)
      .get('/api/orders/1')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.items.length).toEqual(1)
  })

  test('should return error 404 - order not found', async () => {
    prismaMock.order.findUnique.mockResolvedValue(null)

    const { status, body } = await request(server)
      .get('/api/orders/1')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.NOT_FOUND)
    expect(body).toEqual({
      error_msg: 'order not found',
    })
  })

  test('should return error in get order when database returns error', async () => {
    prismaMock.order.findUnique.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .get('/api/orders/1')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })

  test('should return bad request when id is invalid', async () => {
    prismaMock.order.findUnique.mockResolvedValue(orders[0])

    const { status, body } = await request(server)
      .get('/api/orders/aaa')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.BAD_REQUEST)
    expect(body).toEqual({ error_msg: 'order id is invalid' })
  })
})

describe('Post order endpoint', () => {
  test('should create an order and create payment intent', async () => {
    prismaMock.order.create.mockResolvedValue(orders[0])

    const { status, body } = await request(server)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(orders[0])

    expect(status).toBe(httpStatusCodes.CREATED)
    expect(body.client_secret).toBeDefined()
  })

  test('should return error in create the order when database returns error', async () => {
    prismaMock.order.create.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .post('/api/orders')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(orders[0])

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})

describe('Put order endpoint', () => {
  test('should update an order', async () => {
    prismaMock.order.update.mockResolvedValue(orders[0])

    const { status } = await request(server)
      .put(`/api/orders/${orders[0].id}`)
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(orders[0])

    expect(status).toBe(httpStatusCodes.OK)
  })

  test('should return error in create the order when database returns error', async () => {
    prismaMock.order.update.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .put('/api/orders/1')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(orders[0])

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })

  test('should return bad request when id is invalid', async () => {
    prismaMock.order.update.mockResolvedValue(orders[0])

    const { status, body } = await request(server)
      .put(`/api/orders/aaa`)
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(orders[0])

    expect(status).toBe(httpStatusCodes.BAD_REQUEST)
    expect(body).toEqual({ error_msg: 'id value is invalid' })
  })
})
