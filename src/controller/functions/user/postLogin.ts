import { Request, Response } from "express";
import knex from "../../../configs/conection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../middleware/functions/ApiError";
import { BadRequestError } from "../../../middleware/functions/BadRequestError";

export const postLogin = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email, senha } = req.body;

  try {
    const user = await knex("usuarios").where("email", email).first();

    if (!user) {
      throw new BadRequestError("Invalid username or password");
    }

    const validPassword = await bcrypt.compare(senha, user.senha);

    if (!validPassword) {
      throw new BadRequestError("Invalid username or password");
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_PASS as string,
      {
        expiresIn: "8h",
      }
    );

    const { senha: _, ...usuarioLogado } = user;

    return res.status(200).json({ usuario: usuarioLogado, token });
  } catch (error) {
    throw new ApiError("Error while the Login", 500);
  }
};
