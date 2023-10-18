import z from 'zod'

const baseOrderEvent = z.object({
  status: z.string().optional(),
  user_id: z.number().optional(),
  order_id: z.number().optional(),
})

export const OrderEventSchema = baseOrderEvent

export type OrderEventDto = z.infer<typeof OrderEventSchema>
