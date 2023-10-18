import z from 'zod'

const baseOrderProduct = z.object({
  id: z.number().optional(),
  order_id: z.number().optional(),
  product_id: z.number(),
  price: z.number().optional(),
  quantity: z.number(),
})

export const OrderProductSchema = baseOrderProduct

export const PartialOrderProductSchema = OrderProductSchema.partial()

export const OrderProductsSchema = z.array(PartialOrderProductSchema)

export type OrderProductsDto = z.infer<typeof OrderProductsSchema>
