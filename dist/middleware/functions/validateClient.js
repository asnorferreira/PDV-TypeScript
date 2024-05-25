"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClient = void 0;
const conection_1 = __importDefault(require("../../configs/conection"));
const index_1 = __importDefault(require("../validation/index"));
const ApiError_1 = require("./ApiError");
const BadRequestError_1 = require("./BadRequestError");
const joi_1 = __importDefault(require("joi"));
const validateClient = async (req, res, next) => {
    const { id } = req.params;
    const { email, cpf } = req.body;
    try {
        if (req.method === "PUT" || req.method === "GET") {
            const existingClient = await (0, conection_1.default)("clientes").where("id", id).first();
            if (!existingClient) {
                return next(new BadRequestError_1.BadRequestError("Client not found"));
            }
        }
        if (req.method === "PUT" || req.method === "POST") {
            await index_1.default.schemaClient.validateAsync(req.body, { abortEarly: false });
            if (email) {
                const existingEmail = await (0, conection_1.default)("clientes")
                    .where("email", email)
                    .whereNot("id", id || null)
                    .first();
                if (existingEmail) {
                    return next(new BadRequestError_1.BadRequestError("E-mail already exists"));
                }
            }
            if (cpf) {
                const existingCpf = await (0, conection_1.default)("clientes")
                    .where("cpf", cpf)
                    .whereNot("id", id || null)
                    .first();
                if (existingCpf) {
                    return next(new BadRequestError_1.BadRequestError("CPF already exists"));
                }
            }
        }
        next();
    }
    catch (error) {
        if (error instanceof joi_1.default.ValidationError) {
            return next(new BadRequestError_1.BadRequestError(error.details.map((detail) => detail.message).join(", ")));
        }
        next(new ApiError_1.ApiError("Error while validating client", 500));
    }
};
exports.validateClient = validateClient;
