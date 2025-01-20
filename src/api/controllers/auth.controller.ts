import { Request, Response } from "express";
import * as UserRepo from "../../repo/user.repo";
import { validateUser } from "../validators/auth.validator";



export async function signIn(req: Request, res: Response) {
    const body = req.body;
    
    console.log("body", body);

    const errors = await validateUser(body);
    if (errors)
        return res.status(400).json({
            errors
        });

    return res.status(200).json({
        message: "Ok ra"
    });
}
