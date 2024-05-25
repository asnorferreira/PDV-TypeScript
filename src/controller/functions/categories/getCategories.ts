import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";

export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const listCategories = await knex("categorias").select(["id", "descricao"]);

    return res.status(200).json(listCategories);
  } catch (error) {
    throw new ApiError("Error while listing categories", 500);
  }
};
