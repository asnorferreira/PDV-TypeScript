import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { NotFoundError } from "../../../middleware/functions/NotFoundError";

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { categoria_id } = req.query;

  try {
    if (categoria_id) {
      const existingCategory = await knex("categorias")
        .where("id", categoria_id)
        .first();
      if (!existingCategory) {
        throw new NotFoundError("Categories not found");
      }
      const listProducts = await knex("produtos").where(
        "categoria_id",
        categoria_id
      );

      return res.status(200).json(listProducts);
    }

    const listProducts = await knex("produtos");
    return res.status(200).json(listProducts);
  } catch (error) {
    throw new ApiError("Error while list the products", 500);
  }
};
