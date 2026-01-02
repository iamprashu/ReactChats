import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../config/prismaConfig";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  getAccessToken,
  getRefreshToken,
  hashToken,
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

    const newUser = await prisma.user.create({
      data: { email, password: encPassword, name },
    });

    if (!newUser) {
      res.status(500).json({
        success: false,
        message: "Sorry something went wrong",
      });
    }

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
        refreshTokenHash: hashToken(refreshToken),
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
      secure: false,
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
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      message: "Session Expired please login again",
    });
    return;
  }

  try {
    const isValid = jwt.verify(refreshToken, REFRESH_SECRET) as { id: string };

    if (!isValid) {
      res.status(401).json({
        success: false,
        message: "Session expired please login again",
      });
      return;
    }

    const validateSession = await prisma.session.findFirst({
      where: {
        userId: isValid.id,
        refreshTokenHash: hashToken(refreshToken),
        isRevoked: false,
      },
    });

    if (!validateSession) {
      res.status(401).json({
        success: false,
        message: "Session expired or invalid please login again",
      });
      return;
    }

    if (validateSession.expiresAt <= new Date()) {
      await prisma.session.update({
        where: { id: validateSession.id },
        data: { isRevoked: true },
      });

      res.status(401).json({
        success: false,
        message: "Sorry session is expired please login again",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Welcome back",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "sorry something went wrong",
    });

    console.error(`CheckSession : ${error.message}`);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    console.log("Yaha fata");
    res.status(401).json({
      success: false,
      message: "Invalid Session Please login again",
    });
    return;
  }

  try {
    const refreshTokenHash = hashToken(refreshToken);

    console.debug(`in token hash : ${refreshTokenHash}`);

    const checkSession = await prisma.session.findFirst({
      where: { refreshTokenHash, isRevoked: false },
    });

    console.debug(`session checked with : ${refreshTokenHash}`);

    if (!checkSession) {
      console.log("yaha fata");
      res.status(401).json({
        success: false,
        message: "Invalid Session please login again",
      });
      return;
    }

    const updateOldSession = prisma.session.update({
      //jaha pe ye id aur same hash h usko revoke krdo
      where: { id: checkSession.id, refreshTokenHash },
      data: { isRevoked: true },
    });

    console.debug(`updated old session : ${refreshTokenHash}`);

    if (!updateOldSession) {
      res.status(401).json({
        success: false,
        message: "Cannot revive session please login again",
      });
    }

    const userById = await prisma.user.findFirst({
      where: { id: checkSession.userId },
    });

    if (!userById) {
      res.status(401).json({
        success: false,
        message: "Invalid session please login again",
      });
      return;
    }

    const accessToken = jwt.sign({ id: userById?.id }, ACCESS_SECRET, {
      expiresIn: "15m",
    });
    // ye to 7 days ka hi valid h actually session backend me hi handel hoga so no worries
    const newRefreshToken = getRefreshToken({ id: userById.id });

    const newRefreshTokenHash = hashToken(newRefreshToken);

    console.debug(`new refresh token hash : ${newRefreshTokenHash}`);

    const updateSession = await prisma.session.update({
      where: { id: checkSession.id, refreshTokenHash },
      data: {
        refreshTokenHash: newRefreshTokenHash,
      },
    });

    console.debug(`updated session id  : ${updateSession.id}`);

    if (!updateSession) {
      res.status(401).json({
        success: false,
        message:
          "Something went wrong while refreshing token please login again",
      });
      return;
    }

    res.cookie("refreshToken", newRefreshToken, {
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      success: true,
      message: "Session Resumed",
      accessToken,
    });
    return;
  } catch (error: any) {
    console.error(`RefreshToken Controller: ${error.message}`);

    res.status(500).json({
      success: false,
      message: "Server error please try again later",
    });
  }
};
