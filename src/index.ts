import express from "express";
import helmet from "helmet";
import cors from "cors";

import Logger from "./shared/utils/logger";
import { PORT } from "./config/constants";

const app = express();

app.use(cors());
app.use(helmet());



app.listen(PORT, () => Logger.success(`Server running on port ${PORT}...`));