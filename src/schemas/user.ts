import z from 'zod'

const baseUser = {
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
  name: z.string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  }),
  phone: z
    .string({
      invalid_type_error: 'phone must be a string',
    })
    .max(14, 'phone cannot be longer than 14 characters')
    .optional(),
  username: z.string().optional(),
  active: z.boolean().optional(),
}

export const UserSchema = z.object(baseUser)

export type CreateUserDto = z.infer<typeof UserSchema>

export const PartialUserSchema = UserSchema.partial()

export type UpdateUserDto = z.infer<typeof PartialUserSchema>

export const UserLoginSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email(),
  password: z.string(),
})

export type UserLoginDto = z.infer<typeof UserLoginSchema>
