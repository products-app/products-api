import express from 'express';
import checkoutService from '../services/useCases/checkout'

const router = express.Router();

router.post('/stripe', express.json({type: 'application/json'}), checkoutService.checkoutStripeEvents);

export default router;
