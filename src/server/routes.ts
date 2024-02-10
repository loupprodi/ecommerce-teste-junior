import { Router } from "express";
import { createUser } from "./controller/UserController";
import { createOrder, getAllOrder } from "./controller/OrderController";
import { createProduct, deleteProduct, getAllproduct, updateProduct } from "./controller/ProductController";
import { signIn } from "./controller/SessionController";
import { authMiddleware } from "./shared/middleware/AuthMiddleware";
import { orderDelivered, orderProcessing, orderSent } from "./controller/StatusController";

export const router = Router();

router.post("/user", createUser)

router.post("/order", authMiddleware(), createOrder)
router.get("/order",authMiddleware(), getAllOrder);


router.post("/product/:orderId",authMiddleware() ,createProduct)
router.get("/product",authMiddleware() , getAllproduct);
router.put("/product/:productId", authMiddleware(), updateProduct)
router.get("/product/:productId", authMiddleware(), updateProduct)
router.delete("/product/:productId", authMiddleware(), deleteProduct)


router.put("/statusProcess/:orderId", orderProcessing)
router.put("/statusSent/:orderId", orderSent)
router.put("/statusDelivered/:orderId", orderDelivered)



router.get("/signIn", signIn);
