import { Schema, model, models, type InferSchemaType, type Types } from "mongoose";

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, maxlength: 300 },
    content: { type: String, required: true, maxlength: 20000 },
    coverImage: { type: String, required: true },
    tags: { type: [String], default: [] },
    author: { type: String, required: true, default: "XSelect Editors" },
    published: { type: Boolean, default: false, index: true },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

blogPostSchema.index({ published: 1, createdAt: -1 });

export type BlogPostDocument = InferSchemaType<typeof blogPostSchema> & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const BlogPost = models.BlogPost || model("BlogPost", blogPostSchema);
