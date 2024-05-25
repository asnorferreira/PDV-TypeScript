"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const ApiError_1 = require("../../../middleware/functions/ApiError");
const getUser = async (req, res) => {
    try {
        const usuario = req.usuario;
        if (usuario !== undefined) {
            return res.status(201).json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
            });
        }
    }
    catch (error) {
        throw new ApiError_1.ApiError("Error while list the User", 500);
    }
};
exports.getUser = getUser;
