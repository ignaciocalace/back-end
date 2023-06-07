import jwt from "jsonwebtoken";
import { PASSJWT } from "../config/passwords.js";

export function genToken(data) {
  return jwt.sign({ data }, PASSJWT, { expiresIn: "1h" });
}

export function decoToken(token) {
  const payload = jwt.verify(token, PASSJWT);
  return payload["data"];
}
