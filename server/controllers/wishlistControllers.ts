import mongoose from "mongoose";
import { Request, Response } from "express";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Products.js";

// Get user wishlist
// GET /api/wishlist
export const getWishlist = async (req: Request, res: Response) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate("products", "name images price stock");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [],
      });
    }

    res.json({ success: true, data: wishlist });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle product in wishlist
// POST /api/wishlist/:productId
export const toggleWishlist = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params as { productId: string };

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [],
      });
    }

    const exists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );
    } else {
      wishlist.products.push(productId as any);
    }

    await wishlist.save();
    await wishlist.populate("products", "name images price stock");

    res.json({ success: true, data: wishlist });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove product from wishlist
// DELETE /api/wishlist/:productId
export const removeWishlistItem = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("products", "name images price stock");

    res.json({ success: true, data: wishlist });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};