import { Request, Response, NextFunction } from "express";


export default async function authentication(req: Request, res: Response, next: NextFunction) {
    

    return next();
}