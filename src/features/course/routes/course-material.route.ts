import { Router } from "express";
import fileUpload from "express-fileupload";
import asyncHandler from "../../../shared/middlewares/asynchandler";
import * as courseMaterialController from "../controllers/course-material.controller";

const router = Router();

router.use(fileUpload())

router.get("");
router.post("/", asyncHandler(courseMaterialController.upload));

export default router;