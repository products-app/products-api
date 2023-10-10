import prisma from "../db/prisma";

const findOrdersRepo = () => {
  return prisma.order.findMany({
    include: {
      user: true,
      orderProducts: true,
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
      orderProducts: true,
    },
  })
}

const createOrder = (order) => {
  const defaultStatus = "in_process";

  const orderProducts = order.items.map((item) => ({
    productId: item.product_id,
    price: item.price,
    quantity: item.quantity,
  }));

  return prisma.order.create({
    data: {
      id: order.id,
      userId: order.user_id,
      status: defaultStatus,    
      orderProducts: {
        create: orderProducts,
      },
    },
  });
}

const updateOrder = (id: number, order) => {
  const orderProducts = order.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    price: item.price,
    quantity: item.quantity,
  }));

  return prisma.order.update({
    where: { id },
    data: {
      status: order.status,    
      orderProducts: {
        update: orderProducts,
      },    
    },
  });
}

const findOrdersByUserID = (userId: number) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderProducts: true,
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

