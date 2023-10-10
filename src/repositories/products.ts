import prisma from "../db/prisma";

const findProductsRepo = () => {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

const getProductByID = (id: number) => {
  return prisma.product.findUnique({
    where: {
      id,
    }
  })
}

export {
  findProductsRepo,
  getProductByID,
};

