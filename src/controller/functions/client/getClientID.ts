import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";

export const getClientID = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  try {
    const client = await knex("clientes").where("id", id).first();

    return res.status(200).json(client);
  } catch (error) {
    throw new ApiError("Error while listing clients by ID", 500);
  }
};
