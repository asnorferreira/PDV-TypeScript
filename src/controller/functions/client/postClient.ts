import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";

export const postClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { nome, email, cpf } = req.body;

  try {
    const [newClientId] = await knex("clientes")
      .insert({ nome, email, cpf })
      .returning("id");

    const newClient = {
      id: newClientId,
      nome,
      email,
    };

    return res.status(201).json(newClient);
  } catch (error) {
    throw new ApiError("Error while creating Client", 500);
  }
};
