import { Router } from "express";
import courseMaterialRoute from "./routes/course-material.route";

const router = Router();

router.use("/course-materials", courseMaterialRoute);

export default router;