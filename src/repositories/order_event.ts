import prisma from "../db/prisma";

const createOrderEvent = (event) => {
  return prisma.orderEvents.create({
    data: {
      order_id: event.order_id,
      status: event.status,
    },
  });
}

export {
  createOrderEvent,
};

