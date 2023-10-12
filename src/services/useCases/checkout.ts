const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const checkoutPaymentIntent = async (order) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (order.total * 100).toFixed(0),
    currency: 'BRL',
    payment_method_types: ['card'],
    metadata: {
      order_id: order.id,
    }
  });
  return paymentIntent
};
