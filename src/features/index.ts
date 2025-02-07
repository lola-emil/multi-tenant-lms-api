import { Router } from "express";

import userService from "./user";
import tenantService from "./tenant";
import courseManagementService from "./course";
import commerceService from "./commerce";

const router = Router();

router.use("/user-service", userService);
router.use("/tenant-service", tenantService);
router.use("/course-management", courseManagementService);
router.use("/commerce", commerceService);

export default router;