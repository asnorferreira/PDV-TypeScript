import knex from "../../configs/conection";
import { Request, Response, NextFunction } from "express";
import schema from "../validation/index";
import { ApiError } from "./ApiError";
import { BadRequestError } from "./BadRequestError";
import Joi from "joi";

export const validateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params;
  const { email, cpf } = req.body;
  try {
    if (req.method === "PUT" || req.method === "GET") {
      const existingClient = await knex("clientes").where("id", id).first();
      if (!existingClient) {
        return next(new BadRequestError("Client not found"));
      }
    }
    if (req.method === "PUT" || req.method === "POST") {
      await schema.schemaClient.validateAsync(req.body, { abortEarly: false });
      if (email) {
        const existingEmail = await knex("clientes")
          .where("email", email)
          .whereNot("id", id || null)
          .first();
        if (existingEmail) {
          return next(new BadRequestError("E-mail already exists"));
        }
      }

      if (cpf) {
        const existingCpf = await knex("clientes")
          .where("cpf", cpf)
          .whereNot("id", id || null)
          .first();
        if (existingCpf) {
          return next(new BadRequestError("CPF already exists"));
        }
      }
    }

    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return next(
        new BadRequestError(
          error.details.map((detail) => detail.message).join(", ")
        )
      );
    }
    next(new ApiError("Error while validating client", 500));
  }
};
