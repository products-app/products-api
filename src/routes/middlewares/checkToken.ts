/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'
import httpStatusCodes from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import config from '@/config'

interface JwtPayload {
  id: number
  isAdmin: boolean
}

interface Tokens {
  admin: boolean
}

export const checkToken =
  ({ admin }: Tokens) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!config.private_key)
        throw new Error('private key is not configurated')
      if (!token) throw new Error('no token provided')

      const payload = jwt.verify(token, config.private_key) as JwtPayload

      if (!payload?.id && !(!admin || admin === payload.isAdmin)) {
        throw new Error('invalid token')
      }

      req.headers.user = payload.id.toString()
      next()
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res
          .status(httpStatusCodes.UNAUTHORIZED)
          .json({ error_msg: err.message })
          .send()
      }

      return res.sendStatus(httpStatusCodes.UNAUTHORIZED)
    }
  }
