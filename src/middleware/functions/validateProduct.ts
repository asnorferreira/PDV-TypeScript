import knex from "../../configs/conection";
import { Request, Response, NextFunction } from "express";
import schema from "../validation/index";
import { BadRequestError } from "./BadRequestError";
import { ApiError } from "./ApiError";
import Joi from "joi";

export const validateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { categoria_id } = req.body;
  const { id } = req.params;
  try {
    if (["GET", "DELETE", "PUT"].includes(req.method)) {
      const existProduct = await knex("produtos").where("id", id).first();

      if (!existProduct) {
        return next(new BadRequestError("Product not found in system"));
      }

      if (req.method === "DELETE") {
        const productOnOrders = await knex("pedido_produtos")
          .where("produto_id", id)
          .first();

        if (productOnOrders) {
          return next(
            new BadRequestError(
              "Product on orders not found in product list for product type"
            )
          );
        }
      }

      if (req.method === "POST" || req.method === "PUT") {
        await schema.schemaProduct.validateAsync(req.body, {
          abortEarly: false,
        });

        const existingCategory = await knex("categorias")
          .where("id", categoria_id)
          .first();
        if (!existingCategory) {
          return next(new BadRequestError("Category not found"));
        }
      }

      next();
    }
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return next(
        new BadRequestError(
          error.details.map((detail: any) => detail.message).join(", ")
        )
      );
    }

    console.error("Error while validating Product:", error);
    next(new ApiError("Error while validating Product", 500));
  }
};
