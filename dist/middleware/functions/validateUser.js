"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const conection_1 = __importDefault(require("../../configs/conection"));
const index_1 = __importDefault(require("../validation/index"));
const BadRequestError_1 = require("./BadRequestError");
const ApiError_1 = require("./ApiError");
const joi_1 = __importDefault(require("joi"));
const validateUser = async (req, res, next) => {
    var _a;
    const { email } = req.body;
    const userId = (_a = req.usuario) === null || _a === void 0 ? void 0 : _a.id;
    try {
        await index_1.default.schemaUser.validateAsync(req.body, { abortEarly: false });
        if (req.method === "POST") {
            const existingUser = await (0, conection_1.default)("usuarios").where("email", email).first();
            if (existingUser) {
                return next(new BadRequestError_1.BadRequestError("E-mail already exists"));
            }
        }
        if (req.method === "PUT") {
            const existingEmail = await (0, conection_1.default)("usuarios")
                .where("email", email)
                .whereNot("id", userId)
                .first();
            if (existingEmail) {
                return next(new BadRequestError_1.BadRequestError("E-mail already used by another user"));
            }
        }
        next();
    }
    catch (error) {
        if (error instanceof joi_1.default.ValidationError) {
            return next(new BadRequestError_1.BadRequestError(error.details.map((detail) => detail.message).join(", ")));
        }
        console.error("Error while validating User:", error);
        next(new ApiError_1.ApiError("Error while validating User", 500));
    }
};
exports.validateUser = validateUser;
