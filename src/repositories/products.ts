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

const createProduct = (product) => {
  return prisma.product.create({
    data: {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      active: true,    
    },
  });
}

const updateProduct = (id: number, product) => {
  return prisma.product.update({
    where: { id },
    data: {
      name: product.name,
      price: product.price,
      stock: product.stock,
      active: product.active,      
    },
  });
}

export {
  findProductsRepo,
  getProductByID,
  createProduct,
  updateProduct,
};

