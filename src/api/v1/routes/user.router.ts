import { Router } from "express";
import * as UserController from "../controllers/user.controller";
import asyncHandler from "../../../middlewares/asynchandler";

const router = Router();

router.get("/", asyncHandler(UserController.find));

router.post("/", asyncHandler(UserController.insert));

router.patch("/:id", asyncHandler(UserController.update));

router.delete("/:id", asyncHandler(UserController.remove))

export default router;