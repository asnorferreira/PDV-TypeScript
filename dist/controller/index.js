"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCategories_1 = require("./functions/categories/getCategories");
const getUserOwner_1 = require("./functions/user/getUserOwner");
const postUser_1 = require("./functions/user/postUser");
const postLogin_1 = require("./functions/user/postLogin");
const putUpdate_1 = require("./functions/user/putUpdate");
const getClient_1 = require("./functions/client/getClient");
const getClientID_1 = require("./functions/client/getClientID");
const postClient_1 = require("./functions/client/postClient");
const putClient_1 = require("./functions/client/putClient");
const getProduct_1 = require("./functions/product/getProduct");
const getProductID_1 = require("./functions/product/getProductID");
const postProduct_1 = require("./functions/product/postProduct");
const putProduct_1 = require("./functions/product/putProduct");
const deleteProductID_1 = require("./functions/product/deleteProductID");
const postOrder_1 = require("./functions/orders/postOrder");
const getOrder_1 = require("./functions/orders/getOrder");
exports.default = {
    getCategories: getCategories_1.getCategories,
    getUser: getUserOwner_1.getUser,
    postUser: postUser_1.postUser,
    postLogin: postLogin_1.postLogin,
    putUpdate: putUpdate_1.putUpdate,
    getClient: getClient_1.getClient,
    getClientID: getClientID_1.getClientID,
    postClient: postClient_1.postClient,
    putClient: putClient_1.putClient,
    getProduct: getProduct_1.getProduct,
    getProductID: getProductID_1.getProductID,
    postProduct: postProduct_1.postProduct,
    putProduct: putProduct_1.putProduct,
    deleteProductID: deleteProductID_1.deleteProductID,
    postOrder: postOrder_1.postOrder,
    getOrder: getOrder_1.getOrder,
};
