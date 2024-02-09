import { Router } from "express";
import { createUser } from "./controller/UserController";
import { createOrder, getAllOrder } from "./controller/OrderController";
import { createProduct, getAllproduct } from "./controller/ProductController";

export const router = Router();

router.post("/user", createUser)

router.post("/order/:userId", createOrder)
router.get("/order", getAllOrder);


router.post("/product/:orderId", createProduct)
router.get("/product", getAllproduct);