import prisma from "../db/prisma";
import { OrderEventDto } from "../schemas/order_event";

const createOrderEvent = (event: OrderEventDto) => {
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

