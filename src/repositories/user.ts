import prisma from '@/db/prisma'
import { CreateUserDto, UpdateUserDto } from '@/schemas/user'

const findUsers = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      phone: true,
      active: true,
      created_at: true,
      updated_at: true,
    },
  })
}

const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      email: true,
      password: true,
      id: true,
      is_admin: true,
    },
  })
}

const findUserByID = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phone: true,
      active: true,
      created_at: true,
      updated_at: true,
    },
  })
}

const createUser = (user: CreateUserDto) => {
  return prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      active: true,
      created_at: true,
      updated_at: true,
    },
  })
}

const updateUser = (id: number, user: UpdateUserDto) => {
  return prisma.user.update({
    where: { id },
    data: {
      name: user.name,
      username: user.username,
      phone: user.phone,
      active: user.active,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      active: true,
      created_at: true,
      updated_at: true,
    },
  })
}

export { findUsers, findUserByEmail, findUserByID, createUser, updateUser }
