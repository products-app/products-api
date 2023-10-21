import express from 'express'

import swaggerUI from 'swagger-ui-express'

import swaggerFile from './swagger-output.json'

const router = express.Router()

router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

export default router
