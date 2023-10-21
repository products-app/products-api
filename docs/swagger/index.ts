import swaggerAutogen from 'swagger-autogen'
import { version } from '../../package.json'

const doc = {
  info: {
    openapi: '3.1.0',
    version,
    title: 'Prompt API',
    description: `Documentation automatically generated by the <b>swagger-autogen</b> module.<br />
      Some routes need user or admin authentication to work, so first <b>sign in using the user login</b>, <b>click on the Authorize button</b> and <b>enter the token</b> generated by response.
      `,
  },
  host: 'localhost:3333',
  basePath: '/api',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User Login',
      description: 'Generate jwt token for user session',
    },
    {
      name: 'Users',
      description: 'Endpoints of Users CRUD',
    },
    {
      name: 'Products',
      description: 'Endpoints of Products CRUD',
    },
    {
      name: 'Orders',
      description: 'Endpoints of Orders CRUD',
    },
  ],
  definitions: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      userlogin: {
        properties: {
          email: {
            type: 'string',
            example: 'admin@prompt.com.br',
          },
          password: {
            type: 'string',
            example: '12345',
          },
        },
      },
      user: {
        properties: {
          email: {
            type: 'string',
            example: 'dev@gmail.com',
          },
          password: {
            type: 'string',
            example: '12345',
          },
          name: {
            type: 'string',
            example: 'User 1',
          },
          username: {
            type: 'string',
            example: 'dev',
          },
          phone: {
            type: 'string',
            example: '(81)89972-3871',
          },
        },
      },
      product: {
        properties: {
          name: {
            type: 'string',
            example: 'Product 1',
          },
          image: {
            type: 'string',
            example: 'https://source.unsplash.com/random?product=1',
          },
          price: {
            type: 'number',
            example: 12.2,
          },
          stock: {
            type: 'integer',
            example: 10,
          },
        },
      },
      order: {
        properties: {
          user_id: {
            type: 'integer',
            example: '1',
          },
          total: {
            type: 'integer',
            example: 1,
          },
          items: {
            type: 'array',
            item: {
              $ref: '#/components/schemas/orderproduct',
            },
          },
        },
        example: {
          user_id: 1,
          total: 1,
          items: [
            {
              product_id: 1,
              price: 22.1,
              quantity: 1,
            },
          ],
        },
      },
      orderproduct: {
        type: 'object',
        properties: {
          product_id: {
            type: 'string',
          },
          price: {
            type: 'number',
          },
          quantity: {
            type: 'integer',
          },
        },
      },
    },
  },
  securityDefinitions: {
    authorization: {
      type: 'apiKey',
      in: 'header',
      name: 'authorization',
      description: 'This value is the token generated by POST /users/login.',
    },
  },
}

const outputFile = '../../src/swagger-output.json'
const endpointsFiles = ['../../src/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import('../../src/index') // Your project's root file
})
