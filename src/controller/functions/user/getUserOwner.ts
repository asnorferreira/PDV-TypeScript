import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";

interface IUsuario {
  id: number;
  nome: string;
  email: string;
}

declare module "express-serve-static-core" {
  interface Request {
    usuario?: IUsuario;
  }
}

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const usuario: IUsuario | undefined = req.usuario;
    if (usuario !== undefined) {
      return res.status(201).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      });
    }
  } catch (error) {
    throw new ApiError("Error while list the User", 500);
  }
};
