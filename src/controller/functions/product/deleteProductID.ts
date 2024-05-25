import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { deleteFile } from "../../helpers/storage";
import { BadRequestError } from "../../../middleware/functions/BadRequestError";

export const deleteProductID = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where("id", id).first();

    if (!produto) {
      throw new BadRequestError("Product not found: ");
    }

    const imagemPath = produto.produto_imagem;
    if (imagemPath) {
      await deleteFile(imagemPath);
    }

    await knex("produtos").where("id", id).del();

    return res.status(200).json({ mensagem: "Produto excluído com sucesso" });
  } catch (error) {
    throw new ApiError("Error while deleting item from database", 500);
  }
};
