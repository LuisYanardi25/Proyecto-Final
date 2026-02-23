import { Schema, model, InferSchemaType, Types } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    owner: { type: Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export type ProductDoc = InferSchemaType<typeof productSchema>;
export const ProductModel = model("Product", productSchema);