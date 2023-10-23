export const userOrders = [
  {
    id: 1,
    created_at: '2023-10-23T04:05:27.268Z' as unknown as Date,
    updated_at: '2023-10-23T04:05:27.268Z' as unknown as Date,
    user_id: 1,
    status: 'pending_payment',
    total: 3220,
    order_products: [
      {
        id: 1,
        created_at: '2023-10-23T04:05:27.268Z' as unknown as Date,
        updated_at: '2023-10-23T04:05:27.268Z' as unknown as Date,
        order_id: 1,
        product_id: 1,
        price: 1099,
        quantity: 1,
        product: {
          id: 1,
          created_at: '2023-10-22T18:20:21.978Z' as unknown as Date,
          updated_at: '2023-10-22T18:20:21.978Z' as unknown as Date,
          name: 'Essencialismo: A disciplinada busca por menos',
          price: 54.98,
          stock: 10,
          active: true,
          description: null,
          image: 'https://m.media-amazon.com/images/I/71tYBWz6VEL._SY522_.jpg',
        },
      },
    ],
  },
]
