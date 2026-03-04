import express from "express";
import { getWishlist, toggleWishlist, removeWishlistItem } from "../controllers/wishlistControllers.js";
import { protect } from "../middleware/auth.js";

const WishlistRouter = express.Router();

// Get user wishlist
// GET /api/wishlist
WishlistRouter.get("/", protect, getWishlist);

// Toggle product in wishlist
// POST /api/wishlist/:productId
WishlistRouter.post("/:productId", protect, toggleWishlist);

// Remove product from wishlist
// DELETE /api/wishlist/:productId
WishlistRouter.delete("/:productId", protect, removeWishlistItem);

export default WishlistRouter;