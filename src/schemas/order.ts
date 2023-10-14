import z from "zod";
import { OrderProductsSchema } from "./order_product";

const baseOrder = {
  id: z.string().optional(),
  user_id: z.number(),
  status: z.string().optional(),
  total: z.number(),
};

const createOrderSchema = {
  ...baseOrder,
  items: OrderProductsSchema,
};

export const OrderSchema = z.object(createOrderSchema);

export type CreateOrderDto = z.infer<typeof OrderSchema>;

export const PartialOrderSchema = OrderSchema.partial();

export type UpdateOrderDto = z.infer<typeof PartialOrderSchema>;
