"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controller/index"));
const index_2 = __importDefault(require("../middleware/index"));
const multer_1 = __importDefault(require("../configs/multer"));
exports.router = (0, express_1.default)();
exports.router.get("/", (_req, res) => {
    res.send("Hello World");
});
exports.router.use((err, req, res, next) => {
    var _a;
    const statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500;
    return res.status(statusCode).json({ message: err.message });
});
exports.router.get("/categoria", index_1.default.getCategories);
exports.router.post("/usuario", index_2.default.validateUser, index_1.default.postUser);
exports.router.post("/login", index_2.default.validateLogin, index_1.default.postLogin);
exports.router.use(index_2.default.verifyAuth);
//----------------------------ENDPOINTS COM VALIDAÇÃO DE TOKEN----------------------------//
exports.router.get("/usuario", index_1.default.getUser);
exports.router.get("/cliente", index_1.default.getClient);
exports.router.get("/cliente/:id", index_2.default.validateClient, index_1.default.getClientID);
exports.router.get("/produto", index_1.default.getProduct);
exports.router.get("/produto/:id", index_2.default.validateProduct, index_1.default.getProductID);
exports.router.get("/pedido", index_1.default.getOrder);
exports.router.post("/cliente", index_2.default.validateClient, index_1.default.postClient);
exports.router.post("/pedido", index_2.default.validateOrder, index_1.default.postOrder);
exports.router.put("/usuario", index_2.default.validateUser, index_1.default.putUpdate);
exports.router.put("/cliente/:id", index_2.default.validateClient, index_1.default.putClient);
exports.router.delete("/produto/:id", index_2.default.validateProduct, index_1.default.deleteProductID);
//----------------------------ENDPOINTS COM UPLOAD DE ARQUIVOS----------------------------//
exports.router.use(multer_1.default.single(String(process.env.UP_FILE)));
exports.router.post("/produto", index_2.default.validateProduct, index_1.default.postProduct);
exports.router.put("/produto/:id", index_2.default.validateProduct, index_1.default.putProduct);
