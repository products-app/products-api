export default {
  api: {
    baseURL: process.env.API_URL || '/api',
    baseURLWebhook: process.env.WEBHOOK_URL || '/webhooks',
  },
}
