import { getCategories } from "./functions/categories/getCategories";

import { getUser } from "./functions/user/getUserOwner";
import { postUser } from "./functions/user/postUser";
import { postLogin } from "./functions/user/postLogin";
import { putUpdate } from "./functions/user/putUpdate";

import { getClient } from "./functions/client/getClient";
import { getClientID } from "./functions/client/getClientID";
import { postClient } from "./functions/client/postClient";
import { putClient } from "./functions/client/putClient";

import { getProduct } from "./functions/product/getProduct";
import { getProductID } from "./functions/product/getProductID";
import { postProduct } from "./functions/product/postProduct";
import { putProduct } from "./functions/product/putProduct";
import { deleteProductID } from "./functions/product/deleteProductID";

import { postOrder } from "./functions/orders/postOrder";
import { getOrder } from "./functions/orders/getOrder";

export default {
  getCategories,
  getUser,
  postUser,
  postLogin,
  putUpdate,
  getClient,
  getClientID,
  postClient,
  putClient,
  getProduct,
  getProductID,
  postProduct,
  putProduct,
  deleteProductID,
  postOrder,
  getOrder,
};
