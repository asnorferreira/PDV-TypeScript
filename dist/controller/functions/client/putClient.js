"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putClient = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const putClient = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
    try {
        await (0, conection_1.default)("clientes").where("id", id).update({
            nome,
            email,
            cpf,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
        });
        return res.status(201).json({ mensagem: "Cliente atualizado com sucesso" });
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while updating client", 500);
    }
};
exports.putClient = putClient;
