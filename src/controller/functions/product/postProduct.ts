import knex from "../../../configs/conection";
import { Request, Response } from "express";
import { ApiError } from "../../../middleware/functions/ApiError";
import { uploadFile } from "../../helpers/storage";

export const postProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } =
    req.body;

  try {
    let imageUrl = null;

    if (req.file) {
      imageUrl = await uploadFile(
        req.file.originalname,
        req.file.buffer,
        req.file.mimetype
      );
    }

    const newProduct = await knex("produtos")
      .insert({
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

    return res.status(201).json(newProduct[0]);
  } catch (error) {
    throw new ApiError("Error while posting products", 500);
  }
};
