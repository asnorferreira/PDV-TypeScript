"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = void 0;
const conection_1 = __importDefault(require("../../../configs/conection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../../../middleware/functions/ApiError");
const BadRequestError_1 = require("../../../middleware/functions/BadRequestError");
const postLogin = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await (0, conection_1.default)("usuarios").where("email", email).first();
        if (!user) {
            throw new BadRequestError_1.BadRequestError("Invalid username or password");
        }
        const validPassword = await bcrypt_1.default.compare(senha, user.senha);
        if (!validPassword) {
            throw new BadRequestError_1.BadRequestError("Invalid username or password");
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
        }, process.env.JWT_PASS, {
            expiresIn: "8h",
        });
        const { senha: _, ...usuarioLogado } = user;
        return res.status(200).json({ usuario: usuarioLogado, token });
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while the Login", 500);
    }
};
exports.postLogin = postLogin;
