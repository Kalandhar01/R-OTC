import mongoose, { Schema, type Document } from "mongoose"

export interface OtcLeadDocument extends Document {
  name: string
  email: string
  phone?: string
  services: string[]
  projectType?: string
  location?: string
  budget?: string
  message?: string
  company?: string
  sourcePage?: string
  status: "new" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost"
  createdAt: Date
  updatedAt: Date
}

const otcLeadSchema = new Schema<OtcLeadDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    services: { type: [String], default: [] },
    projectType: { type: String },
    location: { type: String },
    budget: { type: String },
    message: { type: String },
    company: { type: String },
    sourcePage: { type: String },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal_sent", "won", "lost"],
      default: "new",
    },
  },
  { timestamps: true, collection: "otcleads" }
)

export default mongoose.models.OtcLead ||
  mongoose.model<OtcLeadDocument>("OtcLead", otcLeadSchema)
