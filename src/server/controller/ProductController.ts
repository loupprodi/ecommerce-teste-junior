import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createProduct = async (req: Request, res: Response) =>{
    const {name, description, price, amount} = req.body;
    const {orderId} = req.params;

    const isOrderExists = await prisma.order.findUnique({
        where:{
            id:orderId
        }
    })

    if(!isOrderExists){
        return res.status(400).json({message:"Não existe pedido"})
    }

    const product = await prisma.product.create({
        data: {name, description, price, amount, order:{
            connect:{id:orderId}
        }},select:{
            id:true,
            name:true,
            description:true,
            price:true,
            amount:true,
            order_id:true
        }
    })

    return res.send(product);
}

export const getAllproduct = async (req: Request , res: Response) => {
    const product = await prisma.product.findMany()

    return res.json(product)
}