import express, { ErrorRequestHandler } from "express";
import helmet from "helmet";
import cors from "cors";

import Logger from "./utils/logger";
import { PORT } from "./config/constants";
import userRepo, { User } from "./repo/user.repo";
import errorHandler, { ErrorResponse } from "./middlewares/errorhandler";

import apiRoute from "./api";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());


// include api route
app.use("/", apiRoute);


app.use("*", (req, res) => {
    let message = `Can't ${req.method} ${req.originalUrl}`;

    Logger.error(message);
    throw new ErrorResponse(404, message);
});


app.use((errorHandler as ErrorRequestHandler));


app.listen(PORT, () => Logger.success(`Server running on port ${PORT}...`));