import { Router } from "express";

import userService from "./user";
import tenantService from "./tenant";

const router = Router();

router.use("/user-service", userService);
router.use("/tenant-service", tenantService);

export default router;