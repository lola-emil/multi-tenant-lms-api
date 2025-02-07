import { config } from "dotenv";

config();

export const DB_HOST = process.env["DB_HOST"] ?? "localhost";
export const DB_PORT = parseInt(process.env["DB_PORT"] ?? "3306");
export const DB_NAME = process.env["DB_NAME"];
export const DB_USER = process.env["DB_USER"];
export const DB_PASSWORD = process.env["DB_PASSWORD"];


export const HOSTNAME = process.env["HOSTNAME"];
export const PORT = parseInt(process.env["PORT"] ?? "5000");

export const JWT_SECRET_KEY = process.env["JWT_SECRET_KEY"] ?? "secret-madafak";


export const MAILER_ADDRESS = process.env["MAILER_ADDRESS"];
export const MALIER_PASSWORD = process.env["MAILER_PASSWORD"];

export const PAYMONGO_PUBLIC_KEY = process.env["PAYMONGO_PUBLIC_KEY"];
export const PAYMONGO_SECRET_KEY = process.env["PAYMONGO_SECRET_KEY"];
export const PAYMONGO_API_URL = process.env["PAYMONGO_API_URL"];