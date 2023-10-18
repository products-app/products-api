import httpStatusCodes from 'http-status-codes'
import { Request, Response } from 'express'
import { findUserByEmail } from '@/repositories/user'
import { checkPassword, generateToken } from '@/helpers/tokens'

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const userExists = await findUserByEmail(email)

    if (!userExists) {
      res.status(httpStatusCodes.NOT_FOUND)
      res.json({ error_msg: 'user not exists' })
      return
    }

    const isPasswordEqual = await checkPassword(password, userExists.password)
    if (!isPasswordEqual) {
      res.status(httpStatusCodes.UNAUTHORIZED)
      res.json({ error_msg: 'invalid credentials' })
      return
    }

    const token = generateToken({
      id: userExists.id,
      email,
      isAdmin: userExists.is_admin || false,
    })

    if (!token) {
      res.status(httpStatusCodes.UNAUTHORIZED)
      res.json({ error_msg: 'error to get credentials' })
      return
    }

    res.status(httpStatusCodes.OK)
    res.json({
      name: userExists.name,
      id: userExists.id,
      user_logged: true,
      token,
    })
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ user_logged: false, error_msg: e })
  }
}

export default {
  userLogin,
}
