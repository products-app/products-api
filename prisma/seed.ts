import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()
  await prisma.order.deleteMany()
  await prisma.orderProducts.deleteMany()
  await prisma.orderEvents.deleteMany()

  console.log('Seeding...')

  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Essencialismo: A disciplinada busca por menos',
        price: 54.98,
        stock: 10,
        image: 'https://m.media-amazon.com/images/I/71tYBWz6VEL._SY522_.jpg',
      },
      {
        name: 'Mindset: A nova psicologia do sucesso',
        price: 32.99,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/71Ils+Co9fL._SY522_.jpg',
      },
      {
        name: 'Até o verão terminar',
        price: 39.99,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/81u8c5lziEL._SY522_.jpg',
      },
      {
        name: 'Mindset: A nova psicologia do sucesso ',
        price: 32.99,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/71Ils+Co9fL._SY522_.jpg',
      },
      {
        name: 'Como fazer amigos e influenciar pessoas',
        price: 44.91,
        stock: 10,
        image: 'https://m.media-amazon.com/images/I/71x-i7sKSvL._SY522_.jpg',
      },
      {
        name: 'Pare de se sabotar e dê a volta por cima: Como se livrar dos comportamentos que atrapalham sua vida',
        price: 38.17,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/71pZxQ3ABPL._SY522_.jpg',
      },
      {
        name: 'A Saga Wingfeather: nos Limites do mar Sombrio da Escuridão',
        price: 56.61,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/81mfukyzJJS._SY522_.jpg',
      },
      {
        name: 'Sem esforço: Torne mais fácil o que é mais importante',
        price: 44.9,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/71yqe0RX3VL._SY522_.jpg',
      },
      {
        name: 'A coragem de ser imperfeito',
        price: 39.9,
        stock: 12,
        image: 'https://m.media-amazon.com/images/I/61rRRbfINJL._SY522_.jpg',
      },
    ],
  })

  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@prompt.com.br',
      password: '12345',
      is_admin: true,
    },
  })

  console.log({ products, user })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
