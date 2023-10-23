import httpStatusCodes from 'http-status-codes'
import request from 'supertest'
import { prismaMock } from '../__mocks__/prisma'
import { users } from '../data/users'
import server from '../../src'

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  verify: jest.fn().mockReturnValue({ id: 1, isAdmin: true }),
}))

describe('Get all users endpoint', () => {
  test('should return all users correctly', async () => {
    prismaMock.user.findMany.mockResolvedValue(users)

    const { status, body } = await request(server)
      .get('/api/users')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.length).toEqual(2)
  })

  test('should return error in find all users when database returns error', async () => {
    prismaMock.user.findMany.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .get('/api/users')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})

describe('Get user endpoint', () => {
  test('should find and get a user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .get('/api/users/1')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.email).toEqual('admin@prompt.com.br')
  })

  test('should return error 404 - user not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    const { status, body } = await request(server)
      .get('/api/users/1')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.NOT_FOUND)
    expect(body).toEqual({
      error_msg: 'user not found',
    })
  })

  test('should return error in get user when database returns error', async () => {
    prismaMock.user.findUnique.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .get('/api/users/1')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })

  test('should return bad request when id is invalid', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .get('/api/users/aaa')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')

    expect(status).toBe(httpStatusCodes.BAD_REQUEST)
    expect(body).toEqual({ error_msg: 'id value is invalid' })
  })
})

describe('Post user endpoint', () => {
  test('should create a user', async () => {
    prismaMock.user.create.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(users[0])

    expect(status).toBe(httpStatusCodes.CREATED)
    expect(body.email).toEqual('admin@prompt.com.br')
  })

  test('should return error when user exists', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])
    prismaMock.user.create.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(users[0])

    expect(status).toBe(httpStatusCodes.CONFLICT)
    expect(body).toEqual({ error_msg: 'user already exists' })
  })

  test('should return error in create the user when database returns error', async () => {
    prismaMock.user.create.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(users[0])

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})

describe('Put user endpoint', () => {
  test('should update a user', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])
    prismaMock.user.update.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .put(`/api/users/${users[0].id}`)
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(users[0])

    expect(status).toBe(httpStatusCodes.OK)
    expect(body.email).toEqual('admin@prompt.com.br')
  })

  test('should return error when user is not found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)
    prismaMock.user.update.mockResolvedValue(users[0])

    const { status, body } = await request(server)
      .put(`/api/users/${users[0].id}`)
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(users[0])

    expect(status).toBe(httpStatusCodes.NOT_FOUND)
    expect(body).toEqual({ error_msg: 'user not exists' })
  })

  test('should return error in create the user when database returns error', async () => {
    prismaMock.user.findUnique.mockResolvedValue(users[0])
    prismaMock.user.update.mockRejectedValue({ db: 'error db' })

    const { status, body } = await request(server)
      .put('/api/users/1')
      .set('Accept', 'application/json')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR')
      .send(users[1])

    expect(status).toBe(httpStatusCodes.INTERNAL_SERVER_ERROR)
    expect(body).toEqual({ error_msg: { db: 'error db' } })
  })
})
