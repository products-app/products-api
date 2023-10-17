export default {
  api: {
    port: process.env.API_PORT || '3333',
    baseURL: process.env.API_URL || '/api',
    baseURLWebhook: process.env.WEBHOOK_URL || '/webhooks',
  },
}
