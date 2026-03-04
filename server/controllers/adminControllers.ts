import { Request, Response } from "express";
import User from "../models/User.js";
import Product from "../models/Products.js";
import Order from "../models/Order.js";


export const getDashboardStats = async(req : Request, res : Response)=>{
    try {
        const totaUsers = await User.countDocuments()
        const totalProducts = await Product.countDocuments()
        const totalOrder = await Order.countDocuments()
        const validOrders = await Order.find({orderStatus : {$ne : 'canceled'}});
        const totalRevenue = validOrders.reduce((sum, order)=> sum + order.totalAmount, 0)
        const recentOrders = await Order.find().sort("-createdAt").limit(5).populate("user", "name , email");
        
        res.json({success : true , data : { totaUsers, totalProducts, totalRevenue, recentOrders, totalOrder}})
    } catch (error : any) {
        res.status(500).json({success : false ,message : error.message})
        
    }
}