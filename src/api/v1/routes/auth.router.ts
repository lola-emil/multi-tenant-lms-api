import { Router } from "express";
import asyncHandler from "../../../middlewares/asynchandler";
import * as UserController from "../controllers/auth.controller";

const router = Router();

router.post("/signin", asyncHandler(UserController.signIn));

export default router;