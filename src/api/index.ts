import { Router } from "express";

import authRouter from "./v1/routes/auth.router";
import userRouter from "./v1/routes/user.router";

const router = Router();

router.use("/auth", authRouter);


router.use("/users", userRouter);

export default router;