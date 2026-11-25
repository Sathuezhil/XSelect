import { Schema, model, models, type InferSchemaType, type Types } from "mongoose";

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    subject: { type: String, required: true, trim: true, maxlength: 140 },
    message: { type: String, required: true, maxlength: 5000 },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

contactSchema.index({ createdAt: -1 });

export type ContactDocument = InferSchemaType<typeof contactSchema> & {
  _id: Types.ObjectId;
  createdAt: Date;
};

export const ContactMessage = models.ContactMessage || model("ContactMessage", contactSchema);
