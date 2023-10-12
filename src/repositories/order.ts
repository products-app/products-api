import prisma from "../db/prisma";

const findOrdersRepo = () => {
  return prisma.order.findMany({
    select: {
      id: true,
      status: true,
      user_id: true,
      total: true,
      order_products: true,
      created_at: true,
      updated_at: true,
    }
  });
}

const getOrderByID = (id: number) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      status: true,
      user_id: true,
      total: true,
      order_products: true,
      created_at: true,
      updated_at: true,
    }
  })
}

const createOrder = (order) => {
  const orderProducts = order.items.map((item) => ({
    product_id: item.product_id,
    price: item.price,
    quantity: item.quantity,
  }));

  return prisma.order.create({
    data: {
      id: order.id,
      user_id: order.user_id,
      total: order.total,
      order_products: {
        create: orderProducts,
      },
    },
  });
}

const updateOrder = (id: number, order) => {
  let orderProducts;
  if (order?.items) {
    orderProducts = order.items.map((item) => ({
      id: item.id || undefined,
      product_id: item.productId || undefined,
      price: item.price || undefined,
      quantity: item.quantity || undefined,
    }));
  }

  return prisma.order.update({
    where: { id },
    data: {
      status: order.status || undefined,
      total: order.total || undefined,
      order_products: {
        update: orderProducts,
      },    
    },
  });
}

const findOrdersByUserID = (userId: number) => {
  return prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: {
      order_products: true,
    },
  });
}

export {
  findOrdersRepo,
  getOrderByID,
  createOrder,
  updateOrder,
  findOrdersByUserID,
};

