import nodemailer from "nodemailer";
import { MAILER_ADDRESS, MALIER_PASSWORD } from "./constants";

export const mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: MAILER_ADDRESS,
      pass: MALIER_PASSWORD,
    }
});