"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductID = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const getProductID = async (req, res) => {
    const { id } = req.params;
    try {
        const existProduct = await (0, conection_1.default)("produtos").where("id", id).first();
        return res.status(200).json(existProduct);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while list the products by ID", 500);
    }
};
exports.getProductID = getProductID;
