import assert from 'assert'
import { hashPassword, checkPassword, generateToken } from './tokens'
import config from '../config'

jest.mock('../config')

describe('token helpers', () => {
  test('should hash the password correctly', () => {
    const password = '123456'
    const hashingPassword = hashPassword(password)

    assert.notEqual(hashingPassword, password)
  })

  test('should check password correctly', async () => {
    const password = '123456'
    const hashingPassword = await hashPassword(password)
    const isEqualPassword = await checkPassword(password, hashingPassword)

    assert.equal(isEqualPassword, true)
  })

  test('should return false when the password is not equal', async () => {
    const password = '123456'

    const wrongPassword = '654321'
    const hashingPassword = await hashPassword(wrongPassword)
    const isEqualPassword = await checkPassword(password, hashingPassword)

    assert.equal(isEqualPassword, false)
  })

  test('should generate user token correctly', () => {
    const userAuth = {
      id: 1,
      email: 'example@gmail.com',
      isAdmin: false,
    }

    const token = generateToken(userAuth)

    assert.notEqual(token, undefined)
  })

  test('should not generate user token', () => {
    config.private_key = null

    const userAuth = {
      id: 0,
      email: '',
    }

    const token = generateToken(userAuth)

    assert.equal(token, undefined)
  })
})
