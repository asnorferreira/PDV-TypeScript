import knex from "../../configs/conection";
import { Request, Response, NextFunction } from "express";
import schema from "../validation/index";
import { ApiError } from "./ApiError";
import { BadRequestError } from "./BadRequestError";
import { NotFoundError } from "./NotFoundError";
import Joi from "joi";

export const validateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { cliente_id, pedido_produtos } = req.body;

  try {
    await schema.schemaOrder.validateAsync(req.body, { abortEarly: false });

    const cliente = await knex("clientes").where("id", cliente_id).first();
    if (!cliente) {
      return next(new NotFoundError("Client not found"));
    }

    for (const pedidoProduto of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedidoProduto;

      const produto = await knex("produtos").where("id", produto_id).first();
      if (!produto) {
        return next(
          new NotFoundError(`Product with ID ${produto_id} not found`)
        );
      }

      if (produto.quantidade_estoque < quantidade_produto) {
        return next(
          new BadRequestError(
            `Insufficient stock for product ${produto.descricao}`
          )
        );
      }
    }

    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return next(
        new BadRequestError(
          error.details.map((detail: any) => detail.message).join(", ")
        )
      );
    }

    console.error("Error while validating order:", error);
    next(new ApiError("Error while validating order", 500));
  }
};
