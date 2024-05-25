"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilatorHtml = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const handlebars_1 = __importDefault(require("handlebars"));
const compilatorHtml = async (archive, context) => {
    const html = await promises_1.default.readFile(archive);
    const compilator = handlebars_1.default.compile(html.toString());
    const htmlString = compilator(context);
    return htmlString;
};
exports.compilatorHtml = compilatorHtml;
