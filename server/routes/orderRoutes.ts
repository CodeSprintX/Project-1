import express from 'express'
import { authorize, protect } from '../middleware/auth.js';
import { createOrder, getAllOrders, getOrder, getOrders, updateOrderStatus } from '../controllers/orders.Controller.js';

const OrderRouter = express.Router();


//Get user orders 

OrderRouter.get('/', protect, getOrders)
//Get single orders 

OrderRouter.get('/:id', protect, getOrder)
//create order from cart  

OrderRouter.post('/', protect, createOrder)
//update order status from admin  

OrderRouter.put('/:id/status', protect, authorize("admin"), updateOrderStatus)

//get all orders (Admin only)  

OrderRouter.get('/admin/all', protect, authorize("admin"), getAllOrders);

export default OrderRouter;




