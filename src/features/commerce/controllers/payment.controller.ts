import { type Request, type Response } from "express";
import axios from "axios";
import { PAYMONGO_API_URL } from "../../../config/constants";

export async function createPayment(req: Request, res: Response) {
    const body = req.body;

    const response = await axios.post(`${PAYMONGO_API_URL}/payments`, body, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    return res.status(200).json(response.data);
}

export async function retrievePayment(req: Request, res: Response) {
    const id = req.params.id;
    const response = await axios.get(`${PAYMONGO_API_URL}/payments/${id}`, {
        headers: {
            "Accept": "application/json",
        }
    });

    return res.status(200).json(response.data);
}