import httpStatusCodes from 'http-status-codes'
import request from 'supertest'
import { prismaMock } from '../__mocks__/prisma'
import { userOrders } from '../data/user_orders'
import { users } from '../data/users'
import server from '../../src'

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockReturnValue({ id: 1, isAdmin: true }),
}))

describe('User order endpoint', () => {
  test('should return all user orders correctly', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])
    prismaMock.order.findMany.mockResolvedValue(userOrders)

    const { status, body } = await request(server)
      .get(`/api/users/${users[0].id}/orders`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.length).toEqual(1)
  })

  test('should return error when user id query param is invalid', async () => {
    const { status, body } = await request(server)
      .get(`/api/users/aaaa/orders`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.BAD_REQUEST)
    expect(body).toEqual({ error_msg: 'user id is invalid' })
  })

  test('should return error when user not exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const { status, body } = await request(server)
      .get(`/api/users/${users[0].id}/orders`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.NOT_FOUND)
    expect(body).toEqual({ error_msg: 'user not exists' })
  })

  test('should return error when find user orders returns error', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])
    prismaMock.order.findMany.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .get(`/api/users/${users[0].id}/orders`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })

  test('should return an empty array when there are no requests', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])
    prismaMock.order.findMany.mockResolvedValue([])

    const { status, body } = await request(server)
      .get(`/api/users/${users[0].id}/orders`)
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body).toEqual([])
  })
})
