"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductID = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const storage_1 = require("../../helpers/storage");
const BadRequestError_1 = require("../../../middleware/functions/BadRequestError");
const deleteProductID = async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await (0, conection_1.default)("produtos").where("id", id).first();
        if (!produto) {
            throw new BadRequestError_1.BadRequestError("Product not found: ");
        }
        const imagemPath = produto.produto_imagem;
        if (imagemPath) {
            await (0, storage_1.deleteFile)(imagemPath);
        }
        await (0, conection_1.default)("produtos").where("id", id).del();
        return res.status(200).json({ mensagem: "Produto excluído com sucesso" });
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while deleting item from database", 500);
    }
};
exports.deleteProductID = deleteProductID;
