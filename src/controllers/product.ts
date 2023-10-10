import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";

const getProducts = async (req: Request, res: Response) => {
  const products = [
    {
      id: 1,
      name: "leg warmers",
      image: "https://source.unsplash.com/random?product=1",
      price: 49.9,
      stock: 10,
    },
    {
      id: 2,
      name: "controller",
      image: "https://source.unsplash.com/random?product=2",
      price: 99.9,
      stock: 1,
      active: true,
    },
    {
      id: 3,
      name: "towel",
      image: "https://source.unsplash.com/random?product=3",
      price: 10,
      stock: 4,
      active: true,
    },
    {
      id: 4,
      name: "soda can",
      image: "https://source.unsplash.com/random?product=4",
      price: 11,
      stock: 9,
      active: true,
    },
    {
      id: 5,
      name: "leg warmers",
      image: "https://source.unsplash.com/random?product=1",
      price: 49.9,
      stock: 10,
      active: true,
    },
    {
      id: 6,
      name: "controller",
      image: "https://source.unsplash.com/random?product=2",
      price: 99.9,
      stock: 1,
      active: true,
    },
    {
      id: 7,
      name: "towel",
      image: "https://source.unsplash.com/random?product=3",
      price: 10,
      stock: 4,
      active: true,
    },
    {
      id: 8,
      name: "soda can",
      image: "https://source.unsplash.com/random?product=4",
      price: 11,
      stock: 9,
      active: true,
    },
  ];

  res.status(httpStatusCodes.OK);
  res.json(products);
};

const getProduct = async (req: Request, res: Response) => {
  const product = {
    id: 1,
    name: "leg warmers",
    image: "https://source.unsplash.com/random?product=1",
    price: 49.9,
    stock: 10,
  };

  res.status(httpStatusCodes.OK);
  res.json(product);
};

export default {
  getProducts,
  getProduct,
};
