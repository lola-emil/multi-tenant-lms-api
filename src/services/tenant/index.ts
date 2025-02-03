import { Router } from "express";
import apiRouter from "./routes/api.route";

const router = Router();

router.use("/api", apiRouter);

export default router;