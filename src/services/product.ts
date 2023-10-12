import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { findProductsRepo, getProductByID, createProduct, updateProduct } from '../repositories/products'

const getProducts = async (req: Request, res: Response) => {
  const searchValue = req.query.search ? req.query.search?.toString() : undefined

  try {
    const products = await findProductsRepo(searchValue);

    res.status(httpStatusCodes.OK);
    res.json(products);
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const getProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "id value is invalid" });
    return
  }

  try {
    const product = await getProductByID(id);

    res.status(httpStatusCodes.OK);
    res.json(product || {});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const postProduct = async (req: Request, res: Response) => {
  const product = req.body;

  if (!product) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "request body cannot be empty" });
    return
  }

  try {
    await createProduct(product);

    res.status(httpStatusCodes.CREATED);
    res.json({});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const putProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "id value is invalid" });
    return
  }

  try {
    const product = req.body;
    await updateProduct(id, product);

    res.status(httpStatusCodes.OK);
    res.json({});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

export default {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
};
