import express from 'express'
import { authorize, protect } from '../middleware/auth.js';
import { getDashboardStats } from '../controllers/adminControllers.js';


const AdminRouter = express.Router();


//Get Dashboard stats

AdminRouter.get('/stats', protect, authorize('admin') , getDashboardStats)



export default AdminRouter