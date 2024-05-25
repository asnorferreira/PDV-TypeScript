"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUpdate = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const NotFoundError_1 = require("../../../middleware/functions/NotFoundError");
const putUpdate = async (req, res) => {
    var _a;
    const { id } = (_a = req.usuario) !== null && _a !== void 0 ? _a : {};
    const { nome, email, senha } = req.body;
    try {
        let encryptedPass = null;
        if (senha) {
            encryptedPass = await bcrypt_1.default.hash(senha, 10);
        }
        const updated = await (0, conection_1.default)("usuarios")
            .where("id", id)
            .update({ nome, email, senha: encryptedPass });
        if (updated === 0) {
            throw new NotFoundError_1.NotFoundError("ID not found");
        }
        return res.status(204).json({ message: "Usuário atualizado" });
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while updating the user", 500);
    }
};
exports.putUpdate = putUpdate;
