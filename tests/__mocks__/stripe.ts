import { DeepMockProxy } from 'jest-mock-extended'
import stripe, { Stripe } from 'stripe'
import { stripePayload } from '../data/stripe'

jest.mock('stripe', () => {
  return jest.fn(() => ({
    paymentIntents: {
      create: jest.fn(() =>
        Promise.resolve({
          client_secret: '123',
        }),
      ),
    },
    webhooks: {
      constructEvent: jest.fn(() => stripePayload),
    },
  }))
})

export const stripeMock =
  stripe as unknown as DeepMockProxy<Stripe.StripeResource>
