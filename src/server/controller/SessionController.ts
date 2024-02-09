import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const signIn = async (req: Request, res: Response) =>{
    try {
        const { email, password} = req.body;

        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            return res.status(400).json({message: "Usuário não encontrado"})
        }
        const isPasswordCorrect = await compare(password, user.password_hash)
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Senha incorreta"})
        }

        const MY_SECRET_KEY = process.env.MY_SECRET_KEY;
        if(!MY_SECRET_KEY){
          throw new Error("Chave Secreta Não fornecida")
        }

        const token = sign({
            userId: user.id
        },MY_SECRET_KEY,{
            algorithm: "HS256",
            expiresIn: "1h"
        })

        return res.status(200).json({token});

    } catch (error) {
        return res.status(400).json(error);

    }

}