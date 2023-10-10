import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import {
  findUserByID,
} from "../../repositories/user";
import {
  findOrdersByUserID,
} from "../../repositories/order";

const getUserOrders = async (req: Request, res: Response) => {
  const userID = parseInt(req.params.id);

  if (!userID) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "user id is invalid" });
    return;
  }

  try {
    const userExists = await findUserByID(userID);
    if (!userExists) {
      res.status(httpStatusCodes.NOT_FOUND);
      res.json({ error_msg: "user not exists" });
      return;
    }

    const orders = await findOrdersByUserID(userID);

    res.status(httpStatusCodes.OK);
    res.json(orders || []);
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

export default {
  getUserOrders,
};
