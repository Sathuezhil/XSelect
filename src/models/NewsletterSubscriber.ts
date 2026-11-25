import { Schema, model, models, type InferSchemaType, type Types } from "mongoose";

const newsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    consent: { type: Boolean, required: true },
    source: { type: String, default: "website" },
  },
  { timestamps: true },
);

export type NewsletterDocument = InferSchemaType<typeof newsletterSchema> & {
  _id: Types.ObjectId;
  createdAt: Date;
};

export const NewsletterSubscriber = models.NewsletterSubscriber || model("NewsletterSubscriber", newsletterSchema);
