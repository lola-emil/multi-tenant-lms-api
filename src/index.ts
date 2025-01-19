import express from "express";
import helmet from "helmet";
import cors from "cors";

import Logger from "./utils/logger";
import { PORT } from "./config/constants";
import userRepo from "./repo/user-repo";

const app = express();

app.use(cors());
app.use(helmet());


app.get("/", async (req, res) => {
    res.status(200).json(await userRepo.find(req.query));
})

app.listen(PORT, () => Logger.success(`Server running on port ${PORT}...`));