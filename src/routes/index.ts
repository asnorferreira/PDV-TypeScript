import express, { NextFunction, Request, Response } from "express";
import { ApiError } from "../middleware/functions/ApiError";
import controller from "../controller/index";
import middleware from "../middleware/index";
import multer from "../configs/multer";

export const router = express();

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});
router.use(
  (
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = err.statusCode ?? 500;
    return res.status(statusCode).json({ message: err.message });
  }
);
router.get("/categoria", controller.getCategories);

router.post("/usuario", middleware.validateUser, controller.postUser);
router.post("/login", middleware.validateLogin, controller.postLogin);

router.use(middleware.verifyAuth);

//----------------------------ENDPOINTS COM VALIDAÇÃO DE TOKEN----------------------------//
router.get("/usuario", controller.getUser);
router.get("/cliente", controller.getClient);
router.get("/cliente/:id", middleware.validateClient, controller.getClientID);
router.get("/produto", controller.getProduct);
router.get("/produto/:id", middleware.validateProduct, controller.getProductID);
router.get("/pedido", controller.getOrder);

router.post("/cliente", middleware.validateClient, controller.postClient);
router.post("/pedido", middleware.validateOrder, controller.postOrder);

router.put("/usuario", middleware.validateUser, controller.putUpdate);
router.put("/cliente/:id", middleware.validateClient, controller.putClient);

router.delete(
  "/produto/:id",
  middleware.validateProduct,
  controller.deleteProductID
);

//----------------------------ENDPOINTS COM UPLOAD DE ARQUIVOS----------------------------//
router.use(multer.single(String(process.env.UP_FILE)));

router.post("/produto", middleware.validateProduct, controller.postProduct);
router.put("/produto/:id", middleware.validateProduct, controller.putProduct);
