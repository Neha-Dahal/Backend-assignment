import { NextFunction, Request, Response } from "express";
import { getHashedPassword } from "../utils/encryption";
import { prismaClient } from "../utils/prisma.utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, address, phone, gender } = req.body;

    const user = await prismaClient.user.findUnique({ where: { email } });
    if (user) throw new Error("User Already Exists");

    const newUser = await prismaClient.user.create({
      data: {
        username,
        email,
        password: await getHashedPassword(password),
        address,
        phone,
        gender,
      },
    });

    const { id, email: userEmail, username: userName } = newUser;
    if (!newUser) throw new Error("Error while register");

    return res.status(200).json({
      success: true,
      data: {
        id,
        email: userEmail,
        username: userName,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) throw new Error("User Not Found");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Invalid Password");

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: 200000,
    });

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    next(e);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        address: true,
        phone: true,
        gender: true,
      },
    });
    res.json(users);
  } catch (e) {
    next(e);
  }
};
