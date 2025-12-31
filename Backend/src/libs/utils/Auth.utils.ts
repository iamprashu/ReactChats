import jwt from "jsonwebtoken";
import "dotenv/config";

import { I_JWTPAYLOAD } from "../types";
import { verify } from "node:crypto";
import { access } from "node:fs";

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

export const checkToken = (
  token: string,
  name: "refresh" | "access"
): Boolean => {
  try {
    if (name === "refresh") {
      const checkToken = jwt.verify(token, REFRESH_SECRET);

      if (!checkToken) {
        return false;
      }
    } else {
      const checkToken = jwt.verify(token, ACCESS_SECRET);
      if (!checkToken) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
};
