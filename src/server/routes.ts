import { Router } from "express";
import { createUser } from "./controller/UserController";
import { createOrder, getAllOrder } from "./controller/OrderController";
import { createProduct, getAllproduct } from "./controller/ProductController";
import { signIn } from "./controller/SessionController";
import { authMiddleware } from "./shared/middleware/AuthMiddleware";

export const router = Router();

router.post("/user", createUser)

router.post("/order/:userId", authMiddleware(), createOrder)
router.get("/order",authMiddleware(), getAllOrder);


router.post("/product/:orderId",authMiddleware() ,createProduct)
router.get("/product",authMiddleware() , getAllproduct);




router.get("/signIn", signIn);
