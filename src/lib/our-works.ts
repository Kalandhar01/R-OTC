import { connectDB } from "@/lib/db"
import OurWorkProject, { type IOurWorkProject } from "@/models/OurWorkProject"

export interface OurWorkProjectData {
  _id: string
  title: string
  slug: string
  division: string
  shortDescription: string
  description: string
  location: string
  status: string
  coverImage: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

function toData(doc: IOurWorkProject): OurWorkProjectData {
  return {
    _id: String(doc._id),
    title: doc.title || "",
    slug: doc.slug || "",
    division: doc.division || "",
    shortDescription: doc.shortDescription || "",
    description: doc.description || "",
    location: doc.location || "",
    status: doc.status || "Completed",
    coverImage: doc.coverImage || "",
    galleryImages: doc.galleryImages || [],
    featured: !!doc.featured,
    published: doc.published !== false,
    displayOrder: doc.displayOrder ?? 0,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : "",
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : "",
  }
}

export async function getProjectsByDivision(division: string): Promise<OurWorkProjectData[]> {
  try {
    await connectDB()
    const docs = await OurWorkProject.find({ division, published: true })
      .sort({ displayOrder: 1, featured: -1, createdAt: -1 })
      .lean()
    return docs.map((d) => toData(d as unknown as IOurWorkProject))
  } catch (error) {
    console.warn("[our-works] Failed to fetch projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<OurWorkProjectData | null> {
  try {
    await connectDB()
    const doc = await OurWorkProject.findOne({ slug, published: true }).lean()
    if (!doc) return null
    return toData(doc as unknown as IOurWorkProject)
  } catch (error) {
    console.warn("[our-works] Failed to fetch project by slug:", error)
    return null
  }
}
