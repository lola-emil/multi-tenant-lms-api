import { type Request, type Response } from "express";
import { validateSignIn } from "../validators/auth.validator";
import { ErrorResponse } from "../../../shared/middlewares/errorhandler";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../config/constants";

export async function signIn(req: Request, res: Response) {
    const body = req.body;

    const error = await validateSignIn(body);

    if (error)
        throw new ErrorResponse(400, "", error);


    const token = jwt.sign({
        email: body.email
    }, JWT_SECRET_KEY); 

    return res.status(200).json({
        token
    });
}