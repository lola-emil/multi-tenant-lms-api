import { Router } from "express";

import paymentIntentRoute from "./routes/payment-intent.route"; 
import paymentMethodRoute from "./routes/payment-method.route";

const router = Router();

router.use("/payment-intents", paymentIntentRoute);
router.use("/payment-methods", paymentMethodRoute);

export default router;