import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createOrder = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const isUserId = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (isUserId) {
    return res.send(400).json({ message: "usuário não existe" });
  }

  const order = await prisma.order.create({
    data: {
      // Status:{
      //   connect:{
      //     status:
      //   }
      // },
      User: {
        connect: {
          id: userId,
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
