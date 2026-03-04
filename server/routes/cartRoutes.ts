import express from 'express'
import { protect } from '../middleware/auth.js';
import { addToCart, clearCartItem, getCart, removeCartItem, updateCartItem } from '../controllers/cartControllers.js';


const CartRouter = express.Router();

//get user cart

CartRouter.get('/', protect, getCart);
//add user cart

CartRouter.post('/add', protect, addToCart);
//update  cart quantity

CartRouter.put('/item/:productId', protect, updateCartItem);
//remove  cart quantity

CartRouter.delete('/item/:productId', protect, removeCartItem);
//clear  cart quantity

CartRouter.delete('/', protect, clearCartItem);


export default CartRouter;

