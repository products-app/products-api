import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { findOrdersRepo, getOrderByID, createOrder, updateOrder } from '../repositories/order'
import { checkoutPaymentIntent } from './useCases/checkout'

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await findOrdersRepo();

    res.status(httpStatusCodes.OK);
    res.json(orders);
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const getOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "order id is invalid" });
    return
  }

  try {
    const order = await getOrderByID(id);

    if (!order) {
      res.status(httpStatusCodes.NOT_FOUND);
      res.json({ error_msg: "order not found" });
      return
    }

    res.status(httpStatusCodes.OK);
    res.json(order);
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const postOrder = async (req: Request, res: Response) => {
  const order = req.body;

  if (!order) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "request body cannot be empty" });
    return
  }

  try {
    // TO DO: VALIDATE TOTAL AND PRODUCTS
    const orderCreated = await createOrder(order);
    const paymentIntent = await checkoutPaymentIntent(orderCreated);

    res.status(httpStatusCodes.CREATED);
    res.json({
      ...orderCreated,
      client_secret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const putOrder = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  
  if (!id) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "id value is invalid" });
    return
  }

  try {
    const order = req.body;
    await updateOrder(id, order);

    res.status(httpStatusCodes.OK);
    res.json({});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

export default {
  getOrders,
  getOrder,
  postOrder,
  putOrder,
};
