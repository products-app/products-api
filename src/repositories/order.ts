import prisma from "../db/prisma";
import { CreateOrderDto, UpdateOrderDto } from "../schemas/order";

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
    },
  });
};

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
    },
  });
};

const createOrder = (order: CreateOrderDto) => {
  const orderProducts = order.items.map((item) => ({
    product_id: item.product_id,
    price: item.price,
    quantity: item.quantity,
  }));

  return prisma.order.create({
    data: {
      user_id: order.user_id,
      total: order.total,
      order_products: {
        create: orderProducts,
      },
    },
  });
};

const updateOrder = (id: number, order: UpdateOrderDto) => {
  return prisma.order.update({
    where: { id },
    data: {
      status: order.status || undefined,
      total: order.total || undefined,
    },
  });
};

const findOrdersByUserID = (userId: number) => {
  return prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: {
      order_products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
};

export {
  findOrdersRepo,
  getOrderByID,
  createOrder,
  updateOrder,
  findOrdersByUserID,
};
