"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaClient = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemaClient = joi_1.default.object({
    nome: joi_1.default.string().required().messages({
        "any.required": "O campo nome é obrigatório",
        "string.empty": "O campo nome é obrigatório",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "O e-mail informado é inválido",
        "any.required": "O campo e-mail é obrigatório",
        "string.empty": "O campo e-mail é obrigatório",
    }),
    cpf: joi_1.default.string().min(11).required().messages({
        "string.empty": "O campo cpf é obrigatório",
        "any.required": "O campo cpf é obrigatório",
        "string.min": "O cpf deve conter no mínimo 11 números",
    }),
    cep: joi_1.default.string().optional(),
    rua: joi_1.default.string().optional(),
    numero: joi_1.default.number().optional(),
    bairro: joi_1.default.string().optional(),
    cidade: joi_1.default.string().optional(),
    estado: joi_1.default.string().optional(),
});
