import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'
import { UserAuthDto } from '../schemas/user'

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  return hash
}

const checkPassword = async (password: string, userPassword: string) => {
  const isEqual = await bcrypt.compare(password, userPassword)
  return isEqual
}

const generateToken = (user: UserAuthDto): string | undefined => {
  if (config.private_key) {
    return jwt.sign(user, config.private_key, {
      expiresIn: '2 days', // expires in 2 days
    })
  }

  return undefined
}

export { hashPassword, checkPassword, generateToken }
