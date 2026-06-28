import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"
import { deleteImage } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const doc = await OurWorkProject.findById(id).lean()
    if (!doc) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }
    return NextResponse.json({ ...doc, id: String(doc._id) })
  } catch (error) {
    console.error("[our-works/id] GET Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()

    const existing = await OurWorkProject.findById(id)
    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    if (body.title && !body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    }

    if (body.slug && body.slug !== existing.slug) {
      const dup = await OurWorkProject.findOne({ slug: body.slug, _id: { $ne: id } })
      if (dup) {
        return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
      }
    }

    Object.assign(existing, body)
    const updated = await existing.save()

    return NextResponse.json({ ...updated.toObject(), id: String(updated._id) })
  } catch (error) {
    console.error("[our-works/id] PUT Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    const doc = await OurWorkProject.findById(id)
    if (!doc) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const imagesToDelete: string[] = []
    if (doc.coverImage) imagesToDelete.push(doc.coverImage)
    if (doc.galleryImages?.length) imagesToDelete.push(...doc.galleryImages)

    await OurWorkProject.findByIdAndDelete(id)

    await Promise.allSettled(imagesToDelete.map((url) => deleteImage(url)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[our-works/id] DELETE Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
