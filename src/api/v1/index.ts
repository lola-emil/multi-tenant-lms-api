import { Router } from "express";

import authRouter from "./routes/auth.router";
import userRouter from "./routes/user.router";
import authorization from "../../middlewares/authorization";

const router = Router();

router.use(authorization);

router.use("/auth", authRouter);

router.use("/users", userRouter);

export default router;