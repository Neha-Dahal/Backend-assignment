import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../utils/prisma.utils";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { prod_name, quantity, price, remark, description } = req.body;

    const newProduct = await prismaClient.product.create({
      data: {
        prod_name,
        quantity,
        price,
        remark,
        description,
      },
    });

    const {
      id,
      prod_name: prodName,
      price: prodPrice,
      description: prodDescription,
    } = newProduct;
    if (!newProduct) throw new Error("Error while creation");

    return res.status(200).json({
      success: true,
      data: {
        id,
        prod_name: prodName,
        price: prodPrice,
        description: prodDescription,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await prismaClient.product.findMany();
    res.json(products);
  } catch (e) {
    next(e);
  }
};
