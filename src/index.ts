import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import config from './config'
import routes from './routes'
import webhooks from './routes/webhooks'

const port = config.api.port || 3333
const app = express()

app.use(cors())

app.use(config.api.baseURLWebhook, webhooks)

app.use(bodyParser.json())
app.use(
  bodyParser.json({
    limit: '10MB',
    type: 'application/json',
  }),
)

app.use(config.api.baseURL, routes)

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`SERVER NOW RUNNING ON PORT ${port}...`))
}

export default app
