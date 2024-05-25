import knex from "../../configs/conection";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import { BadRequestError } from "./BadRequestError";
import Joi from "joi";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Token de autenticação ausente" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, String(process.env.JWT_PASS));

    if (typeof decoded !== "object" || !("id" in decoded)) {
      return next(new ApiError("Invalid token structure", 400));
    }

    const { id } = decoded as JwtPayload;

    const user = await knex("usuarios").where({ id }).first();

    if (!user) {
      return next(new BadRequestError("E-mail already exists"));
    }

    const { senha, ...usuario } = user;

    req.usuario = usuario;

    next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      return next(
        new BadRequestError(
          error.details.map((detail: any) => detail.message).join(", ")
        )
      );
    }

    console.error("Error while validating Authentication:", error);
    next(new ApiError("Error while validating Authentication", 500));
  }
};
