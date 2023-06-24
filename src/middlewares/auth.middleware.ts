import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1] as string;
    console.log(token);

    if (!token) res.status(401).json({ status: false, error: "Access-denied" });
    // console.log(process.env.JWT_SECRET);

    const decode = jwt.verify(token, process.env.JWT_SECRET!);
    // console.log("🚀 ~ file: auth.middleware.ts:12 ~ auth ~ decode:", decode);

    req.user = decode;
    // console.log(
    //   "🚀 ~ file: auth.middleware.ts:15 ~ auth ~ req.user:",
    //   req.user
    // );
    next();
  } catch (error) {
    res.status(401).json({
      status: false,
      error: "Authentication failed",
    });
  }
};
