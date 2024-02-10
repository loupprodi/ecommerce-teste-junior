import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, amount } = req.body;
  const { orderId } = req.params;

  const isOrderExists = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!isOrderExists) {
    return res.status(400).json({ message: "Não existe pedido" });
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      amount,
      order: {
        connect: { id: orderId },
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      amount: true,
      order_id: true,
    },
  });

  return res.send(product);
};

export const getAllproduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findMany();

  return res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, amount } = req.body;
    const { productId } = req.params;
    const { id } = req.user;

    const isProductExistsInUser = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        order: true,
      },
    });

    if (!isProductExistsInUser) {
      return res.status(404).json({ message: "Produto não encontrado!" });
    }

    if (id !== isProductExistsInUser?.order?.userId) {
      return res
        .status(404)
        .json({ message: "Este produto não pertence a esse usuário" });
    }

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        price,
        amount,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json(error)
  }
};


export const getUniqueProduct = async (req: Request, res: Response)=>{
  try {
    const { productId } = req.params;
    const product = await prisma.product.findUnique({
        where:{
           id: productId
        },
        select:{
            id: true,
            name: true,
            price: true,
            amount: true
        }
    })
    if(!product){
        return res.status(404).json({message: "Produto não encontrado"})
    }

    return res.json(product)
  } catch (error) {
    return res.status(400).json(error)
  }
}


export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const { id } = req.user;
  
      const isProductExistsInUser = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        include: {
          order: true,
        },
      });
  
      if (!isProductExistsInUser) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (id !== isProductExistsInUser?.order?.userId) {
        return res
          .status(404)
          .json({ message: "Este produto não pertence a esse usuário" });
      }
  
      await prisma.product.delete({
        where: {
          id: productId,
        },
      });
  
      return res.status(204).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(400).json(error);
    }
  };