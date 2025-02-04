import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as apiController from "../controllers/api.controller";

const router = Router();

router.post("/", asyncHandler(apiController.insert));

export default router;