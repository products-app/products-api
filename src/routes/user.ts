import express from "express";
import userService from "../services/user";
import userUseCases from "../services/useCases/user_orders";
import { validate } from "./middlewares/validate";
import { UserSchema, PartialUserSchema, UserLoginSchema } from "../schemas/user";

const router = express.Router();

router.get("/", userService.getUsers);

router.get("/:id", userService.getUser);

router.post("/", validate(UserSchema), userService.postUser);

router.put("/:id", validate(PartialUserSchema), userService.putUser);

router.post("/login", validate(UserLoginSchema), userService.userLogin);

// Use Cases
router.get("/:id/orders", userUseCases.getUserOrders);

export default router;
