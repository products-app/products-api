import httpStatusCodes from 'http-status-codes'
import { Request, Response } from 'express'
import {
  findUsers,
  findUserByEmail,
  findUserByID,
  createUser,
  updateUser,
} from '@/repositories/user'
import { hashPassword } from '@/helpers/tokens'

const getUsers = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.security = [{
      "authorization": []
    }] 
  */
  try {
    const users = await findUsers()

    res.status(httpStatusCodes.OK)
    res.json(users)
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

const getUser = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.security = [{
      "authorization": []
    }]
  */
  const id = parseInt(req.params.id, 10)

  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST)
    res.json({ error_msg: 'id value is invalid' })
    return
  }

  try {
    const user = await findUserByID(id)
    if (!user) {
      res.status(httpStatusCodes.NOT_FOUND)
      res.json({ error_msg: 'user not found' })
      return
    }

    res.status(httpStatusCodes.OK)
    res.json(user || {})
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

const postUser = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.parameters['obj'] = {
      in: 'body',
      schema: { $ref: '#/components/schemas/user' }
    }
  */
  const { email, name, username, password, phone } = req.body

  try {
    const userExists = await findUserByEmail(email)
    if (userExists) {
      res.status(httpStatusCodes.CONFLICT)
      res.json({ error_msg: 'user already exists' })
      return
    }
    const newPass = await hashPassword(password)
    const newUser = {
      email,
      name,
      username,
      password: newPass,
      phone,
    }

    const created = await createUser(newUser)

    res.status(httpStatusCodes.CREATED).json(created).send()
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

const putUser = async (req: Request, res: Response) => {
  /* 
    #swagger.tags = ['Users']
    #swagger.security = [{
      "authorization": []
    }]
    #swagger.parameters['obj'] = {
      in: 'body',
      schema: { $ref: '#/components/schemas/user' }
    }
  */
  const id = parseInt(req.params.id, 10)
  const { email, name, username, password, phone } = req.body

  const userExists = await findUserByEmail(email)
  if (!userExists) {
    res.status(httpStatusCodes.NOT_FOUND)
    res.json({ error_msg: 'user not exists' })
    return
  }

  try {
    const userToUpdate = {
      name,
      username,
      password,
      phone,
    }
    const updated = await updateUser(id, userToUpdate)

    res.status(httpStatusCodes.OK).json(updated).send()
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR)
    res.json({ error_msg: e })
  }
}

export default {
  getUsers,
  getUser,
  postUser,
  putUser,
}
