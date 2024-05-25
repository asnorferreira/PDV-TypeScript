import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "./BadRequestError";
import { ApiError } from "./ApiError";
import Joi from "joi";

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const schemaLogin = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "O e-mail informado é inválido",
        "any.required": "O campo e-mail é obrigatório",
      }),
      senha: Joi.string().min(6).required().messages({
        "string.min": "A senha deve conter no mínimo 6 caracteres",
        "any.required": "O campo senha é obrigatório",
      }),
    });

    const { error } = schemaLogin.validate(req.body, { abortEarly: false });

    if (error) {
      return next(
        new BadRequestError(
          error.details.map((detail) => detail.message).join(", ")
        )
      );
    }

    next();
  } catch (error) {
    next(new ApiError("Error while validating Login", 500));
  }
};
