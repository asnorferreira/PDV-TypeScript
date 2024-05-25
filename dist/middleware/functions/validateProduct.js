"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const conection_1 = __importDefault(require("../../configs/conection"));
const index_1 = __importDefault(require("../validation/index"));
const BadRequestError_1 = require("./BadRequestError");
const ApiError_1 = require("./ApiError");
const joi_1 = __importDefault(require("joi"));
const validateProduct = async (req, res, next) => {
    const { categoria_id } = req.body;
    const { id } = req.params;
    try {
        if (["GET", "DELETE", "PUT"].includes(req.method)) {
            const existProduct = await (0, conection_1.default)("produtos").where("id", id).first();
            if (!existProduct) {
                return next(new BadRequestError_1.BadRequestError("Product not found in system"));
            }
            if (req.method === "DELETE") {
                const productOnOrders = await (0, conection_1.default)("pedido_produtos")
                    .where("produto_id", id)
                    .first();
                if (productOnOrders) {
                    return next(new BadRequestError_1.BadRequestError("Product on orders not found in product list for product type"));
                }
            }
            if (req.method === "POST" || req.method === "PUT") {
                await index_1.default.schemaProduct.validateAsync(req.body, {
                    abortEarly: false,
                });
                const existingCategory = await (0, conection_1.default)("categorias")
                    .where("id", categoria_id)
                    .first();
                if (!existingCategory) {
                    return next(new BadRequestError_1.BadRequestError("Category not found"));
                }
            }
            next();
        }
    }
    catch (error) {
        if (error instanceof joi_1.default.ValidationError) {
            return next(new BadRequestError_1.BadRequestError(error.details.map((detail) => detail.message).join(", ")));
        }
        console.error("Error while validating Product:", error);
        next(new ApiError_1.ApiError("Error while validating Product", 500));
    }
};
exports.validateProduct = validateProduct;
