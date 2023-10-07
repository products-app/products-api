import { app } from './app';

app.get('/hello', () => {
  return 'Hello World'
})

app.listen({
  host: '0.0.0.0',
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!')
})