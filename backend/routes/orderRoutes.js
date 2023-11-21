import express from "express";
import { admin,protect } from "../middleware/authMiddleware.js";
import { addOrderItems,
        getMyOrders,
        getOrderById,
        updateOrderToDelivered,
        updateOrderToPaid,
        getOrders } from "../controllers/orderController.js"; 

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.get('/myorders', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin, updateOrderToDelivered);

export default router;