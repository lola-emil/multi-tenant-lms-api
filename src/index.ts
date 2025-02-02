import express, { ErrorRequestHandler } from "express";
import helmet from "helmet";
import cors from "cors";

import Logger from "./shared/utils/logger";
import { PORT } from "./config/constants";
import userRepo, { User } from "./shared/repo/user.repo";
import errorHandler, { ErrorResponse } from "./shared/middlewares/errorhandler";

import authorization from "./shared/middlewares/authorization";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(helmet());


app.use(authorization);

// include api route


app.use("*", (req, res) => {
    let message = `Can't ${req.method} ${req.originalUrl}`;

    Logger.error(message);
    throw new ErrorResponse(404, message);
});


app.use((errorHandler as ErrorRequestHandler));


app.listen(PORT, () => Logger.success(`Server running on port ${PORT}...`));