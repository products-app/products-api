import prisma from "../db/prisma";

const findUsers = () => {
  return prisma.user.findMany({
    select: {
      email: true,
      username: true,
      id: true,
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
  createUser,
  updateUser,
};

