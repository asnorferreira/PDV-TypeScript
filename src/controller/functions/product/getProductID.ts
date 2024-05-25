import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";

export const getProductID = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const existProduct = await knex("produtos").where("id", id).first();

    return res.status(200).json(existProduct);
  } catch (error) {
    throw new ApiError("Error while list the products by ID", 500);
  }
};
