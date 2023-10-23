import httpStatusCodes from 'http-status-codes'
import request from 'supertest'
import { stripePayload, signature } from '../data/stripe'
import server from '../../src'

describe('Post checkout endpoint', () => {
  test('should return success when call the stripe', async () => {
    const { status } = await request(server)
      .post('/webhooks/stripe')
      .set('stripe-signature', signature)
      .send(stripePayload)

    expect(status).toBe(httpStatusCodes.OK)
  })
})
