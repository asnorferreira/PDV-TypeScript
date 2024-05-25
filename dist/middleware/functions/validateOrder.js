"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = void 0;
const conection_1 = __importDefault(require("../../configs/conection"));
const index_1 = __importDefault(require("../validation/index"));
const ApiError_1 = require("./ApiError");
const BadRequestError_1 = require("./BadRequestError");
const NotFoundError_1 = require("./NotFoundError");
const joi_1 = __importDefault(require("joi"));
const validateOrder = async (req, res, next) => {
    const { cliente_id, pedido_produtos } = req.body;
    try {
        await index_1.default.schemaOrder.validateAsync(req.body, { abortEarly: false });
        const cliente = await (0, conection_1.default)("clientes").where("id", cliente_id).first();
        if (!cliente) {
            return next(new NotFoundError_1.NotFoundError("Client not found"));
        }
        for (const pedidoProduto of pedido_produtos) {
            const { produto_id, quantidade_produto } = pedidoProduto;
            const produto = await (0, conection_1.default)("produtos").where("id", produto_id).first();
            if (!produto) {
                return next(new NotFoundError_1.NotFoundError(`Product with ID ${produto_id} not found`));
            }
            if (produto.quantidade_estoque < quantidade_produto) {
                return next(new BadRequestError_1.BadRequestError(`Insufficient stock for product ${produto.descricao}`));
            }
        }
        next();
    }
    catch (error) {
        if (error instanceof joi_1.default.ValidationError) {
            return next(new BadRequestError_1.BadRequestError(error.details.map((detail) => detail.message).join(", ")));
        }
        console.error("Error while validating order:", error);
        next(new ApiError_1.ApiError("Error while validating order", 500));
    }
};
exports.validateOrder = validateOrder;
