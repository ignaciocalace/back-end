import dotenv from "dotenv";

dotenv.config();

export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;

export const PASSJWT = process.env.PASSJWT;
export const COOKIESIGN = process.env.COOKIESIGN;

export const CLIENTIDGITHUB = process.env.CLIENTIDGITHUB;
export const CLIENTSECRETGITHUB = process.env.CLIENTSECRETGITHUB;
export const CBURLGITHUB = process.env.CBURLGITHUB;
export const NODE_ENV = process.env.NODE_ENV;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
