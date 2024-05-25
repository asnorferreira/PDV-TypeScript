"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientID = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const getClientID = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await (0, conection_1.default)("clientes").where("id", id).first();
        return res.status(200).json(client);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while listing clients by ID", 500);
    }
};
exports.getClientID = getClientID;
