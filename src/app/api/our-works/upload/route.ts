import { NextResponse } from "next/server"
import { uploadImageBuffer } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadImageBuffer(buffer, file.name)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("[our-works/upload] Error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
