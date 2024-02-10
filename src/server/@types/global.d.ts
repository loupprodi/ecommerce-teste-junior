import express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      },
      status: {
        NOVO
        EM_PROCESSAMENTO
        ENVIADO
        ENTREGUE
      } 
    }
  }
}