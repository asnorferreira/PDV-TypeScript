import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { uploadFile } from "../../helpers/storage";

export const putProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;
  const { id } = req.params;

  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadFile(
        req.file.originalname,
        req.file.buffer,
        req.file.mimetype
      );
    }

    const updatedProduct = await knex("produtos")
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imageUrl,
      })
      .returning([
        "id",
        "descricao",
        "quantidade_estoque",
        "valor",
        "categoria_id",
        "produto_imagem",
      ]);

    return res.status(201).json(updatedProduct[0]);
  } catch (error) {
    throw new ApiError("Error while update the Product", 500);
  }
};
