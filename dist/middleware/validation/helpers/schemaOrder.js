"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaOrder = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemaOrder = joi_1.default.object({
    cliente_id: joi_1.default.number().integer().positive().required().messages({
        "number.base": "O cliente_id deve ser um número positivo",
        "number.integer": "O cliente_id deve ser um número inteiro",
        "number.positive": "O cliente_id deve ser um número positivo",
        "any.required": "O campo cliente_id é obrigatório",
    }),
    observacao: joi_1.default.string().optional(),
    pedido_produtos: joi_1.default.array()
        .items(joi_1.default.object({
        produto_id: joi_1.default.number().integer().positive().required().messages({
            "number.base": "O produto_id deve ser um número positivo",
            "number.integer": "O produto_id deve ser um número inteiro",
            "number.positive": "O produto_id deve ser um número positivo",
            "any.required": "O campo produto_id é obrigatório",
        }),
        quantidade_produto: joi_1.default.number()
            .integer()
            .positive()
            .required()
            .messages({
            "number.base": "A quantidade_produto deve ser um número positivo",
            "number.integer": "A quantidade_produto deve ser um número inteiro",
            "number.positive": "A quantidade_produto deve ser um número positivo",
            "any.required": "O campo quantidade_produto é obrigatório",
        }),
    }))
        .min(1)
        .required()
        .messages({
        "array.min": "Deve haver pelo menos um produto no pedido",
        "any.required": "O campo pedido_produtos é obrigatório",
    }),
});
