import jwt from "jsonwebtoken";
import "dotenv/config";
import CryptoJS from "crypto-js";

import { I_JWTPAYLOAD } from "../types";

const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export function getAccessToken(payload: I_JWTPAYLOAD): string {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function getRefreshToken(payload: I_JWTPAYLOAD): string {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export const hashToken = (token: string): string => {
  return CryptoJS.SHA256(token).toString(CryptoJS.enc.Hex);
};
