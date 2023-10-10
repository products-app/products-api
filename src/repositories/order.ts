import prisma from "../db/prisma";

const findOrdersRepo = () => {
  return prisma.order.findMany({
    include: {
      user: true,
      OrderProducts: true,
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
      OrderProducts: true,
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
      OrderProducts: {
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
      OrderProducts: {
        update: orderProducts,
      },    
    },
  });
}

export {
  findOrdersRepo,
  getOrderByID,
  createOrder,
  updateOrder,
};

