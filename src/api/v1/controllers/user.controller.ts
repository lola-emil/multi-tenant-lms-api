import { Request, Response } from "express";
import userRepo, { User } from "../../../repo/user.repo";
import bcrypt from "bcrypt";

export async function find(req: Request, res: Response) {
    const query = req.query;
    const result = await userRepo.find(query);
    return res.status(200).json(result);
}

export async function insert(req: Request, res: Response) {
    const body = req.body as User;


    body.password = (await bcrypt.hash(body.password, 10));

    const result = await userRepo.insert(body);

    return res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    const result = await userRepo.update(id, body);

    return res.status(200).json(result);
}

export async function remove(req: Request, res: Response) {
    const id = req.params.id;
    const result = await userRepo.remove(id);

    return res.status(200).json(result);
}