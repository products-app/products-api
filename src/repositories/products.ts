import prisma from "../db/prisma";

const findProductsRepo = (search: string | undefined) => {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      stock: true,
      image: true,
      created_at: true,
      updated_at: true,
    },
    where: {
      name: {
        contains: search,
      },
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
  const defaultActiveStatus = true;

  return prisma.product.create({
    data: {
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      active: defaultActiveStatus,    
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
      image: product.image,     
    },
  });
}

export {
  findProductsRepo,
  getProductByID,
  createProduct,
  updateProduct,
};

