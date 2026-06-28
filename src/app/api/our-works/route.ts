import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const division = searchParams.get("division") || "OTC"
    const admin = searchParams.get("admin") === "true"
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")))

    const filter: Record<string, unknown> = {}
    if (!admin) {
      filter.published = true
    }
    filter.division = division
    if (status) filter.status = status
    if (featured === "true") filter.featured = true
    if (featured === "false") filter.featured = false
    if (search) filter.title = { $regex: search, $options: "i" }

    const [docs, total] = await Promise.all([
      OurWorkProject.find(filter)
        .sort({ displayOrder: 1, featured: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      OurWorkProject.countDocuments(filter),
    ])

    return NextResponse.json({
      works: docs.map((d) => ({ ...d, id: String(d._id) })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("[our-works] GET Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") ||
      "project"

    const existing = await OurWorkProject.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
    }

    const project = await OurWorkProject.create({
      title: body.title.trim(),
      slug,
      division: body.division || "OTC",
      shortDescription: body.shortDescription || "",
      description: body.description || "",
      location: body.location || "",
      status: body.status || "Completed",
      coverImage: body.coverImage || "",
      galleryImages: body.galleryImages || [],
      featured: body.featured || false,
      published: body.published !== false,
      displayOrder: body.displayOrder ?? 0,
    })

    return NextResponse.json(
      { ...project.toObject(), id: String(project._id) },
      { status: 201 }
    )
  } catch (error) {
    console.error("[our-works] POST Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
