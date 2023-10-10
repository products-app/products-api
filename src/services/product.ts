import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { findProductsRepo, getProductByID } from '../repositories/products'

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await findProductsRepo();

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

export default {
  getProducts,
  getProduct,
};
