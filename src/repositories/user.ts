import prisma from "../db/prisma";

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
  });
}

const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      password: true,
      id: true,
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
      password: true,
      phone: true,
      active: true,
      created_at: true,
      updated_at: true,
    },
  })
}

const createUser = (user) => {
  const defaultActiveStatus = true;

  return prisma.user.create({
    data: {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      phone: user.phone,
      active: defaultActiveStatus,    
    },
  });
}

const updateUser = (id: number, user) => {
  return prisma.user.update({
    where: { id },
    data: {
      name: user.name,
      username: user.username,
      phone: user.phone,     
    },
  });
}

export {
  findUsers,
  findUserByEmail,
  findUserByID,
  createUser,
  updateUser,
};

