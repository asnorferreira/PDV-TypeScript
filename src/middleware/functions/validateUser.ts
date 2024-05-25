import knex from "../../configs/conection";
import { Request, Response, NextFunction } from "express";
import schema from "../validation/index";
import { BadRequestError } from "./BadRequestError";
import { ApiError } from "./ApiError";
import Joi from "joi";

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = req.body;
  const userId = req.usuario?.id;
  try {
    await schema.schemaUser.validateAsync(req.body, { abortEarly: false });

    if (req.method === "POST") {
      const existingUser = await knex("usuarios").where("email", email).first();

      if (existingUser) {
        return next(new BadRequestError("E-mail already exists"));
      }
    }

    if (req.method === "PUT") {
      const existingEmail = await knex("usuarios")
        .where("email", email)
        .whereNot("id", userId)
        .first();

      if (existingEmail) {
        return next(new BadRequestError("E-mail already used by another user"));
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

    console.error("Error while validating User:", error);
    next(new ApiError("Error while validating User", 500));
  }
};
