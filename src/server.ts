import { app } from '@/app';
import { env } from "@/env";

app.register(async function (app) {
  app.get('/', (req, reply) => {
    reply.send({ hello: 'world' })
  })

  app.get('/products', () => {
    return [
      {
        id: 1,
        name: "leg warmers",
        image: "https://source.unsplash.com/random?product=1",
        price: 49.9,
        stock: 10,
      },
      {
        id: 2,
        name: "controller",
        image: "https://source.unsplash.com/random?product=2",
        price: 99.9,
        stock: 1,
        active: true,
      },
      {
        id: 3,
        name: "towel",
        image: "https://source.unsplash.com/random?product=3",
        price: 10,
        stock: 4,
        active: true,
      },
      {
        id: 4,
        name: "soda can",
        image: "https://source.unsplash.com/random?product=4",
        price: 11,
        stock: 9,
        active: true,
      },
      {
        id: 5,
        name: "leg warmers",
        image: "https://source.unsplash.com/random?product=1",
        price: 49.9,
        stock: 10,
        active: true,
      },
      {
        id: 6,
        name: "controller",
        image: "https://source.unsplash.com/random?product=2",
        price: 99.9,
        stock: 1,
        active: true,
      },
      {
        id: 7,
        name: "towel",
        image: "https://source.unsplash.com/random?product=3",
        price: 10,
        stock: 4,
        active: true,
      },
      {
        id: 8,
        name: "soda can",
        image: "https://source.unsplash.com/random?product=4",
        price: 11,
        stock: 9,
        active: true,
      },
    ]
  })

  app.get('/hello', () => {
    return 'Hello World'
  })
  
})




app.listen({
  host: '0.0.0.0',
  port: env.PORT,
}).then(() => {
  console.log('HTTP Server Running!')
})