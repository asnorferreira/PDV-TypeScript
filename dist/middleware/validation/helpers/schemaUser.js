"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemaUser = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "O e-mail informado é inválido",
        "any.required": "O campo e-mail é obrigatório",
        "string.empty": "O campo e-mail é obrigatório",
    }),
    senha: joi_1.default.string().min(6).required().messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha é obrigatório",
        "string.min": "A senha deve conter no mínimo 6 caracteres",
    }),
});
