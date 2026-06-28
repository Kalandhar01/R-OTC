import mongoose, { Schema, type Document } from "mongoose";

export interface IOurWorkProject extends Document {
  title: string;
  slug: string;
  division: string;
  shortDescription: string;
  description: string;
  location: string;
  status: "Completed" | "Ongoing" | "Upcoming";
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const OurWorkProjectSchema = new Schema<IOurWorkProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    division: { type: String, required: true, index: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Upcoming"],
      default: "Completed",
    },
    coverImage: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "portfolioprojects" }
);

const OurWorkProject =
  (mongoose.models.OurWorkProject as mongoose.Model<IOurWorkProject>) ||
  mongoose.model<IOurWorkProject>("OurWorkProject", OurWorkProjectSchema);

export default OurWorkProject;
