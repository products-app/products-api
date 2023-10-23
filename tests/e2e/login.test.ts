import httpStatusCodes from 'http-status-codes'
import request from 'supertest'
import { prismaMock } from '../__mocks__/prisma'
import { users } from '../data/users'
import server from '../../src'
import config from '../../src/config'

jest.mock('../../src/config')

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockReturnValue({ id: 1, isAdmin: true }),
}))

describe('User login endpoint', () => {
  test('should be able to admin login correctly', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send({ email: users[0].email, password: '12345' })

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.user_logged).toEqual(true)
  })

  test('should be able to user login correctly', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[1])

    const { status, body } = await request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send({ email: users[1].email, password: '12345' })

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.user_logged).toEqual(true)
  })

  test('should return 404 when user not exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const { status, body } = await request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send({ email: users[0].email, password: '12345' })

    expect(status).toBe(httpStatusCodes.NOT_FOUND)
    expect(body).toEqual({ error_msg: 'user not exists' })
  })

  test('should return invalid credentials when user password is wrong', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send({ email: users[0].email, password: '123' })

    expect(status).toBe(httpStatusCodes.UNAUTHORIZED)
    expect(body).toEqual({ error_msg: 'invalid credentials' })
  })

  test('should return error when database returns error', async () => {
    prismaMock.user.findUnique.mockRejectedValue({})

    const { status } = await request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send({ email: users[0].email, password: '12345' })

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
  })

  test('should return error when database returns error', async () => {
    config.private_key = null

    prismaMock.user.findUnique.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .send({ email: users[0].email, password: '12345' })

    expect(status).toBe(httpStatusCodes.UNAUTHORIZED)
    expect(body).toEqual({ error_msg: 'error to get credentials' })
  })
})
