import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const isUserEmailUnique = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserEmailUnique) {
      return res
        .status(400)
        .json({ message: "Ja existe um usuário com esse email" });
    }

    const hashPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: { name, email, password_hash: hashPassword },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};


export const getAllUser = async (req: Request, res: Response)=>{
  try {
    const users = await prisma.user.findMany({
      select:{
        id:true,
        name: true,
        email: true
      }
    });

    if(!users){
      return res.status(204).json({message:"Registro não encontrado"})
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
}