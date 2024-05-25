"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProduct = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const storage_1 = require("../../helpers/storage");
const postProduct = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id, produto_imagem } = req.body;
    try {
        let imageUrl = null;
        if (req.file) {
            imageUrl = await (0, storage_1.uploadFile)(req.file.originalname, req.file.buffer, req.file.mimetype);
        }
        const newProduct = await (0, conection_1.default)("produtos")
            .insert({
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
        return res.status(201).json(newProduct[0]);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while posting products", 500);
    }
};
exports.postProduct = postProduct;
