import { Router } from "express";

import userService from "./user";

const router = Router();

router.use("/user-service", userService);

export default router;