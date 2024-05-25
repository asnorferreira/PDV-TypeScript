"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuth = void 0;
const conection_1 = __importDefault(require("../../configs/conection"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("./ApiError");
const BadRequestError_1 = require("./BadRequestError");
const joi_1 = __importDefault(require("joi"));
const verifyAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ mensagem: "Token de autenticação ausente" });
    }
    try {
        const token = authorization.replace("Bearer ", "").trim();
        const decoded = jsonwebtoken_1.default.verify(token, String(process.env.JWT_PASS));
        if (typeof decoded !== "object" || !("id" in decoded)) {
            return next(new ApiError_1.ApiError("Invalid token structure", 400));
        }
        const { id } = decoded;
        const user = await (0, conection_1.default)("usuarios").where({ id }).first();
        if (!user) {
            return next(new BadRequestError_1.BadRequestError("E-mail already exists"));
        }
        const { senha, ...usuario } = user;
        req.usuario = usuario;
        next();
    }
    catch (error) {
        if (error instanceof joi_1.default.ValidationError) {
            return next(new BadRequestError_1.BadRequestError(error.details.map((detail) => detail.message).join(", ")));
        }
        console.error("Error while validating Authentication:", error);
        next(new ApiError_1.ApiError("Error while validating Authentication", 500));
    }
};
exports.verifyAuth = verifyAuth;
