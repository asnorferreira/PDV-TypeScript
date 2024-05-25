"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putProduct = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const storage_1 = require("../../helpers/storage");
const putProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
    const { id } = req.params;
    try {
        let imageUrl = null;
        if (req.file) {
            imageUrl = await (0, storage_1.uploadFile)(req.file.originalname, req.file.buffer, req.file.mimetype);
        }
        const updatedProduct = await (0, conection_1.default)("produtos")
            .where({ id })
            .update({
            descricao,
            quantidade_estoque,
            valor,
            categoria_id,
            produto_imagem: imageUrl,
        })
            .returning([
            "id",
            "descricao",
            "quantidade_estoque",
            "valor",
            "categoria_id",
            "produto_imagem",
        ]);
        return res.status(201).json(updatedProduct[0]);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while update the Product", 500);
    }
};
exports.putProduct = putProduct;
