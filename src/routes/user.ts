import express from 'express'
import userService from '@/services/user'
import userUseCases from '@/services/useCases/user_orders'
import { UserSchema, PartialUserSchema, UserLoginSchema } from '@/schemas/user'
import loginUseCases from '@/services/useCases/login'
import { validate } from './middlewares/validate'
import { checkToken } from './middlewares/checkToken'

const router = express.Router()

router.get('/', checkToken({ admin: true }), userService.getUsers)

router.get('/:id', checkToken({ admin: false }), userService.getUser)

router.post('/', validate(UserSchema), userService.postUser)

router.put(
  '/:id',
  [checkToken({ admin: false }), validate(PartialUserSchema)],
  userService.putUser,
)

// Use Cases
router.get(
  '/:id/orders',
  checkToken({ admin: false }),
  userUseCases.getUserOrders,
)

router.post('/login', validate(UserLoginSchema), loginUseCases.userLogin)

export default router
