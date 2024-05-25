"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemaUser_1 = require("./helpers/schemaUser");
const schemaClient_1 = require("./helpers/schemaClient");
const schemaProduct_1 = require("./helpers/schemaProduct");
const schemaOrder_1 = require("./helpers/schemaOrder");
exports.default = {
    schemaUser: schemaUser_1.schemaUser,
    schemaClient: schemaClient_1.schemaClient,
    schemaProduct: schemaProduct_1.schemaProduct,
    schemaOrder: schemaOrder_1.schemaOrder,
};
