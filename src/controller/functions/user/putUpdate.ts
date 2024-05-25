import { Request, Response } from "express";
import knex from "../../../configs/conection";
import bcrypt from "bcrypt";
import { ApiError } from "../../../middleware/functions/ApiError";
import { NotFoundError } from "../../../middleware/functions/NotFoundError";

export const putUpdate = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.usuario ?? {};
  const { nome, email, senha } = req.body;

  try {
    let encryptedPass = null;
    if (senha) {
      encryptedPass = await bcrypt.hash(senha, 10);
    }

    const updated = await knex("usuarios")
      .where("id", id)
      .update({ nome, email, senha: encryptedPass });

    if (updated === 0) {
      throw new NotFoundError("ID not found");
    }

    return res.status(204).json({ message: "Usuário atualizado" });
  } catch (error) {
    throw new ApiError("Error while updating the user", 500);
  }
};
