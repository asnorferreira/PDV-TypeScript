"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const NotFoundError_1 = require("../../../middleware/functions/NotFoundError");
const getProduct = async (req, res) => {
    const { categoria_id } = req.query;
    try {
        if (categoria_id) {
            const existingCategory = await (0, conection_1.default)("categorias")
                .where("id", categoria_id)
                .first();
            if (!existingCategory) {
                throw new NotFoundError_1.NotFoundError("Categories not found");
            }
            const listProducts = await (0, conection_1.default)("produtos").where("categoria_id", categoria_id);
            return res.status(200).json(listProducts);
        }
        const listProducts = await (0, conection_1.default)("produtos");
        return res.status(200).json(listProducts);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while list the products", 500);
    }
};
exports.getProduct = getProduct;
