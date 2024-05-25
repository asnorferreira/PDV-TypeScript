import knex from "../../../configs/conection";
import { Request, Response} from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { NotFoundError } from "../../../middleware/functions/NotFoundError";

export const getClient = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const clients = await knex("clientes").select([
      "id",
      "nome",
      "email",
      "cpf",
      knex.raw("coalesce(cep, '') as cep"),
      knex.raw("coalesce(rua, '') as rua"),
      knex.raw("coalesce(numero, 0) as numero"),
      knex.raw("coalesce(bairro, '') as bairro"),
      knex.raw("coalesce(cidade, '') as cidade"),
      knex.raw("coalesce(estado, '') as estado"),
    ]);

    if (clients.length === 0) {
      throw new NotFoundError(
        "Não existem clientes cadastrados em seu banco de dados"
      );
    }

    return res.status(200).json(clients);
  } catch (error) {
    throw new ApiError("Error while listing clients", 500);
  }
};
