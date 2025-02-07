import { Router } from "express";
import * as paymentIntentController from "../controllers/payment-intent.controller";
import asyncHandler from "../../../shared/middlewares/asynchandler";

const router = Router();

router.post("/", asyncHandler(paymentIntentController.createPaymentIntent));
router.post("/:id/attach", asyncHandler(paymentIntentController.attachPaymentIntent));
router.get("/:id", asyncHandler(paymentIntentController.retrievePaymentIntent));

export default router;