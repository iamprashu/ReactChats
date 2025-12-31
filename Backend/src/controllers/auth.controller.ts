import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../config/prismaConfig";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  checkToken,
  getAccessToken,
  getRefreshToken,
} from "../libs/utils/Auth.utils";

const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const signupController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({
        success: false,
        message: "Please provide complete details",
      });
      return;
    }

    const isUserExist = await prisma.user.findFirst({ where: { email } });
    if (isUserExist) {
      res.status(400).json({
        success: false,
        message: "This user already exists, please login",
      });
      return;
    }

    const encPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: encPassword, name },
    });

    res.status(201).json({
      success: true,
      message: "User created, please login",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
    return;
  }
};

export const loginController = async (
  req: Request<{}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Please provide complete details",
    });
    return;
  }

  try {
    const checkUser = await prisma.user.findFirst({ where: { email } });

    if (!checkUser) {
      res.status(401).json({
        success: false,
        message: "Please check email or password",
      });
      return;
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      res.status(401).json({
        success: false,
        message: "Please check email or password",
      });
      return;
    }

    const jwt_payload = { id: checkUser.id };

    const accessToken = getAccessToken(jwt_payload);
    const refreshToken = getRefreshToken(jwt_payload);

    const newSession = await prisma.session.create({
      data: {
        userId: checkUser.id,
        refreshTokenHash: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    if (!newSession) {
      res.status(400).json({
        success: false,
        message: "Sorry session cannot be created",
      });
    }

    res.cookie("refreshToken", refreshToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: `Welcome back ${checkUser.name}`,
      accessToken,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
export const checkSessionController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      message: "Session Expired please login again",
    });
    return;
  }

  try {
    const isValid = jwt.verify(refreshToken, REFRESH_SECRET);

    if (!isValid) {
      res.status(401).json({
        success: false,
        message: "Session expired please login again",
      });
    }

    const checkTokenInDb = prisma.session.findFirst({
      where: { userId: isValid.id },
    });
  } catch (error) {}
};
