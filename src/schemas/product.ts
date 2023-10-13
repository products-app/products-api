import z from 'zod';

const baseProduct = {
  name: z.string({
    required_error: "name is required",
    invalid_type_error: "name must be a string",
  }),
  price: z.number({
    required_error: "price is required",
    invalid_type_error: "price must be a number",
  }),
  stock: z.number({
    required_error: "stock is required",
    invalid_type_error: "stock must be a number",
  }),
  active: z.boolean().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
};

export const ProductSchema = z.object(baseProduct);

export type CreateProductDto = z.infer<typeof ProductSchema>;

export const PartialProductSchema = ProductSchema.partial();

export type UpdateProductDto = z.infer<typeof PartialProductSchema>;
