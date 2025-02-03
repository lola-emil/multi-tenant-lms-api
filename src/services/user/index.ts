import { Router } from "express";
import authRoute from "./routes/auth.route";
import apiRoute from "./routes/api.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/api", apiRoute);

export default router;