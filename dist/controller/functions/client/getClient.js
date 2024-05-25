"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClient = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const NotFoundError_1 = require("../../../middleware/functions/NotFoundError");
const getClient = async (req, res) => {
    try {
        const clients = await (0, conection_1.default)("clientes").select([
            "id",
            "nome",
            "email",
            "cpf",
            conection_1.default.raw("coalesce(cep, '') as cep"),
            conection_1.default.raw("coalesce(rua, '') as rua"),
            conection_1.default.raw("coalesce(numero, 0) as numero"),
            conection_1.default.raw("coalesce(bairro, '') as bairro"),
            conection_1.default.raw("coalesce(cidade, '') as cidade"),
            conection_1.default.raw("coalesce(estado, '') as estado"),
        ]);
        if (clients.length === 0) {
            throw new NotFoundError_1.NotFoundError("Não existem clientes cadastrados em seu banco de dados");
        }
        return res.status(200).json(clients);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while listing clients", 500);
    }
};
exports.getClient = getClient;
