"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postClient = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const postClient = async (req, res) => {
    const { nome, email, cpf } = req.body;
    try {
        const [newClientId] = await (0, conection_1.default)("clientes")
            .insert({ nome, email, cpf })
            .returning("id");
        const newClient = {
            id: newClientId,
            nome,
            email,
        };
        return res.status(201).json(newClient);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while creating Client", 500);
    }
};
exports.postClient = postClient;
