const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import httpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import { createOrderEvent } from "../../repositories/order_event";
import { updateOrder } from "../../repositories/order";
import { CreateOrderDto } from "../../schemas/order";

export const checkoutPaymentIntent = async (order: CreateOrderDto) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (order.total * 100).toFixed(0),
    currency: "brl",
    automatic_payment_methods: { enabled: true },
    metadata: {
      order_id: order.id,
    },
  });
  console.log(paymentIntent);
  return paymentIntent;
};

const checkoutStripeEvents = async (req: Request, res: Response) => {
  let event = req.body;

  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.ENDPOINT_SECRET
    );
  } catch (err) {
    return res.sendStatus(httpStatusCodes.BAD_REQUEST);
  }

  const { metadata, status } = event.data.object;
  if (!metadata?.order_id || !status) {
    return res.sendStatus(httpStatusCodes.BAD_REQUEST);
  }

  let orderStatus = undefined;
  switch (event.type) {
    case "checkout.session.async_payment_succeeded":
      orderStatus = "payment_confirmed";
      break;
    case "checkout.session.async_payment_failed" || "checkout.session.expired":
      orderStatus = "canceled";
      break;
    case "checkout.session.completed":
      orderStatus = "waiting_for_shipment";
      break;
  }

  const orderID = parseInt(metadata.order_id);
  if (orderStatus) {
    await updateOrder(orderID, {
      status: orderStatus,
    });
  }

  await createOrderEvent({
    order_id: orderID,
    status,
  });

  res.send();
};

export default {
  checkoutStripeEvents,
};
