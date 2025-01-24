import { Request, Response, NextFunction } from "express";
import apiKeyRepo from "../repo/api-key.repo";
import { ErrorResponse } from "./errorhandler";


export default async function authorization(req: Request, res: Response, next: NextFunction) {
    const key = req.headers["x-api-key"] as string;

    const matchedKey = await apiKeyRepo.find({ key: key ?? null });

    // check if key is registered
    if (matchedKey.length == 0)
        return next(new ErrorResponse(403, "You don't have permission to access this resource."));

    res.locals.keyType = matchedKey;
    
    return next();
}