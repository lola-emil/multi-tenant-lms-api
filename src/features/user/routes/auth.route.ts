import { Router } from "express";
import asyncHandler from "../../../shared/middlewares/asynchandler";

import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/signin", asyncHandler(authController.signIn));

export default router;