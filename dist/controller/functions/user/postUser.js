"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUser = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const postUser = async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const encryptedPass = await bcrypt_1.default.hash(senha, 10);
        const newUser = await (0, conection_1.default)("usuarios")
            .insert({ nome, email, senha: encryptedPass })
            .returning(["id", "nome", "email"]);
        return res.status(201).json(newUser[0]);
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while register the new user", 500);
    }
};
exports.postUser = postUser;
