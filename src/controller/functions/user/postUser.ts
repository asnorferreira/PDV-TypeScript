import { Request, Response } from "express";
import knex from "../../../configs/conection";
import bcrypt from "bcrypt";
import { ApiError } from "../../../middleware/functions/ApiError";

export const postUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { nome, email, senha } = req.body;

  try {
    const encryptedPass = await bcrypt.hash(senha, 10);

    const newUser = await knex("usuarios")
      .insert({ nome, email, senha: encryptedPass })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(newUser[0]);
  } catch (error) {
    throw new ApiError("Error while register the new user", 500);
  }
};
