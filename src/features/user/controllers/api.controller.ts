import { type Request, type Response } from "express";
import { User } from "../repositories/user";
import { UserProfile } from "../repositories/user-profile";
import { validateUser } from "../validators/auth.validator";
import { ErrorResponse } from "../../../shared/middlewares/errorhandler";

import userRepo from "../repositories/user";
import userProfileRepo from "../repositories/user-profile";

import bcrypt from "bcrypt";


export async function insert(req: Request, res: Response) {
    const body = req.body as User & UserProfile;

    const error = await validateUser(body);

    if (error)
        throw new ErrorResponse(400, "", error);

    const userResult = await userRepo.insert({
        email: body.email,
        password: await bcrypt.hash(body.password, 10)
    });

    const userProfileResult = await userProfileRepo.insert({
        fname: body.fname,
        mname: body.mname,
        lname: body.lname,
        birthdate: body.birthdate,
        user_id: userResult[0]
    });

    return res.status(200).json({
        user: userResult,
        profile: userProfileResult
    });
}