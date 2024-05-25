"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const getCategories = async (req, res) => {
    try {
        const listCategories = await (0, conection_1.default)("categorias").select(["id", "descricao"]);
        return res.status(200).json(listCategories);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while listing categories", 500);
    }
};
exports.getCategories = getCategories;
