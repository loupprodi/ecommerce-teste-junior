import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createOrder = async (req: Request, res: Response) => {
  const { id } = req.user;

  const existUserId = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!existUserId) {
    return res.send(400).json({ message: "usuário não existe" });
  }

  const order = await prisma.order.create({
    data: {
      User: {
        connect: {
          id: id,
        },
      },
    },
  });

  return res.json(order);
};

export const getAllOrder = async (req: Request, res: Response) => {
  const order = await prisma.order.findMany({
    select: {
      id: true,
      userId: true,
      status: true,
      User: {
        select: {
          name: true,
        },
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          amount: true,
        },
      },
    },
  });

  return res.json(order);
};
