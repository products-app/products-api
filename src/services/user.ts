import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import {
  findUsers,
  findUserByEmail,
  createUser,
  updateUser,
} from "../repositories/user";
import { hashPassword, checkPassword } from "../helpers/tokens";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await findUsers();

    res.status(httpStatusCodes.OK);
    res.json(users);
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "id value is invalid" });
    return;
  }

  try {
    const user = await findUserByEmail(email);

    res.status(httpStatusCodes.OK);
    res.json(user || {});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const postUser = async (req: Request, res: Response) => {
  const { email, name, username, password, phone } = req.body;

  if (!email) {
    res.status(httpStatusCodes.BAD_REQUEST);
    res.json({ error_msg: "email cannot be empty" });
    return;
  }

  try {
    const userExists = await findUserByEmail(email);
    if (userExists) {
      res.status(httpStatusCodes.CONFLICT);
      res.json({ error_msg: "user already exists" });
      return;
    }
    const newPass = await hashPassword(password);
    const newUser = {
      email,
      name,
      username,
      password: newPass,
      phone,
    };

    await createUser(newUser);

    res.status(httpStatusCodes.CREATED);
    res.json({});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const putUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { email, name, username, password, phone } = req.body;

  const userExists = await findUserByEmail(email);
  if (!userExists) {
    res.status(httpStatusCodes.NOT_FOUND);
    res.json({ error_msg: "user not exists" });
    return;
  }

  try {
    const userToUpdate = {
      name,
      username,
      phone,
    };
    await updateUser(id, userToUpdate);

    res.status(httpStatusCodes.OK);
    res.json({});
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ error_msg: e });
  }
};

const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userExists = await findUserByEmail(email);

    if (!userExists) {
      res.status(httpStatusCodes.NOT_FOUND);
      res.json({ error_msg: "user not exists" });
      return;
    }

    const isPasswordEqual = await checkPassword(password, userExists.password);
    if (!isPasswordEqual) {
      res.status(httpStatusCodes.UNAUTHORIZED);
      res.json({ error_msg: "invalid credentials" });
      return;
    }

    res.status(httpStatusCodes.OK);
    res.json({ user_logged: true });
  } catch (e) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR);
    res.json({ user_logged: false, error_msg: e });
  }
};

export default {
  getUsers,
  getUser,
  postUser,
  putUser,
  userLogin,
};
