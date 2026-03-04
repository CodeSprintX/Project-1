import mongoose from "mongoose";
import { IWishlist } from "../types/index.js";

const WishlistSchema = new mongoose.Schema<IWishlist>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IWishlist>("Wishlist", WishlistSchema);