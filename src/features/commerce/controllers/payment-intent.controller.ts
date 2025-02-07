import { type Request, type Response } from "express";
import axios from "axios";
import { PAYMONGO_API_URL } from "../../../config/constants";



export async function createPaymentIntent(req: Request, res: Response) {
    const body = req.body;
    const response = await axios.post(`${PAYMONGO_API_URL}/payment_intents`, body, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    return res.json(response.data);
}

export async function retrievePaymentIntent(req: Request, res: Response) {
    const id = req.params.id;
    
    const response = await axios.get(`${PAYMONGO_API_URL}/payment_intents/${id}`, {
        headers: {
            "Accept": "application/json"
        }
    });

    return res.json(response.data);
}

export async function attachPaymentIntent(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    const response = await axios.post(`${PAYMONGO_API_URL}/payment_intents/${id}/attach`, body, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    return res.json(response.data);
}