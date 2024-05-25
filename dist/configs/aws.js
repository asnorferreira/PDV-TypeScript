"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("dotenv/config");
const s3 = new aws_sdk_1.default.S3({
    endpoint: process.env.ENDPOINT_S3 !== undefined
        ? new aws_sdk_1.default.Endpoint(process.env.ENDPOINT_S3)
        : undefined,
    credentials: {
        accessKeyId: String(process.env.KEY_ID),
        secretAccessKey: String(process.env.APP_KEY),
    },
});
exports.default = s3;
