import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { prisma } from "../config/prismaConfig";

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete details",
      });
    }

    const isUserExist = await prisma.user.findUnique({ where: { email } });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "This user already exists, please login",
      });
    }

    const encPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: encPassword, name },
    });

    return res.status(201).json({
      success: true,
      message: "User created, please login",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const loginController = async (req: Request, res: Response) => {};
export const checkSessionController = async (req: Request, res: Response) => {};
