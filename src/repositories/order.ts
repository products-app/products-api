import prisma from "../db/prisma";

const findOrdersRepo = () => {
  return prisma.order.findMany({
    include: {
      user: true,
      order_products: true,
    },
  });
}

const getOrderByID = (id: number) => {
  return prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      order_products: true,
    },
  })
}

const createOrder = (order) => {
  const defaultStatus = "in_process";

  const orderProducts = order.items.map((item) => ({
    product_id: item.product_id,
    price: item.price,
    quantity: item.quantity,
  }));

  return prisma.order.create({
    data: {
      id: order.id,
      user_id: order.user_id,
      status: defaultStatus,    
      order_products: {
        create: orderProducts,
      },
    },
  });
}

const updateOrder = (id: number, order) => {
  const orderProducts = order.items.map((item) => ({
    id: item.id,
    product_id: item.productId,
    price: item.price,
    quantity: item.quantity,
  }));

  return prisma.order.update({
    where: { id },
    data: {
      status: order.status,    
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

