import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";

export const putClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    await knex("clientes").where("id", id).update({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    });
    return res.status(201).json({ mensagem: "Cliente atualizado com sucesso" });
  } catch (error) {
    throw new ApiError("Error while updating client", 500);
  }
};
