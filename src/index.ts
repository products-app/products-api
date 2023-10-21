import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import config from './config'
import routes from './routes'
import webhooks from './routes/webhooks'
import swagger from './swagger'

const port = config.api.port || 3333
const app = express()

app.use(cors())

app.use(swagger)

app.use(
  config.api.baseURLWebhook,
  express.raw({ type: 'application/json' }),
  webhooks,
)

app.use(bodyParser.json())
app.use(
  bodyParser.json({
    limit: '10MB',
    type: 'application/json',
  }),
)

app.use(config.api.baseURL, routes)

app.listen(port, () => console.log(`SERVER NOW RUNNING ON PORT ${port}...`))

export default app
