import { type Request, type Response } from "express";
import axios from "axios";
import { PAYMONGO_API_URL } from "../../../config/constants";

export async function createPaymentMethod(req: Request, res: Response) {
    const body = req.body;
    const response = await axios.post(`${PAYMONGO_API_URL}/payment_methods`, body, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    return res.json(response.data);
}

export async function retrievePossibleMerchants(req: Request, res: Response) {
    const response = await axios.get(`${PAYMONGO_API_URL}/merchants/capabilities/payment_methods`);
    return res.json(response.data); 
}

export async function retrievePaymentMethod(req: Request, res: Response) {
    const id = req.params.id;
    const response = await axios.get(`${PAYMONGO_API_URL}/payment_methods/${id}`);
    return res.json(response.data);
}

export async function updatePaymentMethod(req: Request, res: Response) {
    const body = req.body;
    const id = req.params.id;

    const response = await axios.put(`${PAYMONGO_API_URL}/payment_methods/${id}`, body, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    return res.json(response.data);
}