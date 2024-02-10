import { Status } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const orderProcessing = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const novoStatus = Status.EM_PROCESSAMENTO;
    const orderStatus = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: novoStatus,
      },
    });
    
    return res.status(200).json(orderStatus);

  } catch (error) {
    res.status(400).json(error)
  }
};


export const orderSent = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const novoStatus = Status.ENVIADO;
      const orderStatus = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: novoStatus,
        },
      });
      
      return res.status(200).json(orderStatus);
  
    } catch (error) {
      res.status(400).json(error)
    }
  };


  export const orderDelivered = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const novoStatus = Status.ENTREGUE;
      const orderStatus = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: novoStatus,
        },
      });
      
      return res.status(200).json(orderStatus);
  
    } catch (error) {
      res.status(400).json(error)
    }
  };