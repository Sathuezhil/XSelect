import { Schema, model, models, type InferSchemaType, type Types } from "mongoose";

const specificationSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, maxlength: 300 },
    description: { type: String, required: true, maxlength: 8000 },
    images: { type: [String], required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true, index: true },
    brand: { type: String, required: true, trim: true, index: true },
    features: { type: [String], default: [] },
    specifications: { type: [specificationSchema], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    amazonUrl: { type: String, required: true },
    affiliateUrl: { type: String, required: true },
    affiliateTag: { type: String, default: "" },
    price: { type: Number, default: null },
    priceUpdatedAt: { type: Date, default: null },
    featured: { type: Boolean, default: false, index: true },
    trending: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false, index: true },
    isDeal: { type: Boolean, default: false, index: true },
    active: { type: Boolean, default: true, index: true },
    isDemo: { type: Boolean, default: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

productSchema.index({ active: 1, createdAt: -1 });
productSchema.index({ name: "text", brand: "text", shortDescription: "text" });

export type ProductDocument = InferSchemaType<typeof productSchema> & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const Product = models.Product || model("Product", productSchema);
