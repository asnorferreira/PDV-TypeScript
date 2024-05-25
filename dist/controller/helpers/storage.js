"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.uploadFile = void 0;
const aws_1 = __importDefault(require("../../configs/aws"));
const uploadFile = async (path, buffer, mimetype) => {
    const file = await aws_1.default
        .upload({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
        Body: buffer,
        ContentType: mimetype,
    })
        .promise();
    return file.Location;
};
exports.uploadFile = uploadFile;
const deleteFile = async (path) => {
    await aws_1.default
        .deleteObject({
        Bucket: process.env.BACKBLAZE_BUCKET,
        Key: path,
    })
        .promise();
};
exports.deleteFile = deleteFile;
