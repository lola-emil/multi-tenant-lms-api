import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as paymentMethodController from "../controllers/payment-method.controller";

const router = Router();

// router.get("/",)
router.get("/:id", asyncHandler(paymentMethodController.retrievePaymentMethod))
router.post("/", asyncHandler(paymentMethodController.createPaymentMethod));
router.put("/:id", asyncHandler(paymentMethodController.updatePaymentMethod));

export default router;
