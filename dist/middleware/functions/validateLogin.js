"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const BadRequestError_1 = require("./BadRequestError");
const ApiError_1 = require("./ApiError");
const joi_1 = __importDefault(require("joi"));
const validateLogin = async (req, res, next) => {
    try {
        const schemaLogin = joi_1.default.object({
            email: joi_1.default.string().email().required().messages({
                "string.email": "O e-mail informado é inválido",
                "any.required": "O campo e-mail é obrigatório",
            }),
            senha: joi_1.default.string().min(6).required().messages({
                "string.min": "A senha deve conter no mínimo 6 caracteres",
                "any.required": "O campo senha é obrigatório",
            }),
        });
        const { error } = schemaLogin.validate(req.body, { abortEarly: false });
        if (error) {
            return next(new BadRequestError_1.BadRequestError(error.details.map((detail) => detail.message).join(", ")));
        }
        next();
    }
    catch (error) {
        next(new ApiError_1.ApiError("Error while validating Login", 500));
    }
};
exports.validateLogin = validateLogin;
