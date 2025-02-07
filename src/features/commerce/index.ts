import { Router } from "express";

import paymentIntentRoute from "./routes/payment-intent.route"; 

const router = Router();

router.use("payment-intents", paymentIntentRoute);

export default router;