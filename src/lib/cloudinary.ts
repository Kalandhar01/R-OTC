import { writeFile, unlink, mkdir } from "fs/promises"
import path from "path"

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dgqbgdk73"
const API_KEY = process.env.CLOUDINARY_API_KEY || ""
const API_SECRET = process.env.CLOUDINARY_API_SECRET || ""
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`

async function sha1(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function saveLocal(buffer: Buffer, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  await mkdir(uploadsDir, { recursive: true })
  const unique = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`
  const filePath = path.join(uploadsDir, unique)
  await writeFile(filePath, buffer)
  return `/uploads/${unique}`
}

async function deleteLocal(publicUrl: string): Promise<void> {
  if (!publicUrl.startsWith("/uploads/")) return
  const filename = publicUrl.replace("/uploads/", "")
  const filePath = path.join(process.cwd(), "public", "uploads", filename)
  try { await unlink(filePath) } catch { /* ignore */ }
}

export async function uploadImageBuffer(
  buffer: Buffer,
  filename: string
): Promise<string> {
  if (!API_KEY || !API_SECRET) {
    return saveLocal(buffer, filename)
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const publicId = `our-works/${Date.now()}-${path.parse(filename).name}`
  const signatureStr = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`
  const signature = await sha1(signatureStr)

  try {
    const formData = new FormData()
    const blob = new Blob([new Uint8Array(buffer)], { type: "application/octet-stream" })
    formData.append("file", blob, filename)
    formData.append("public_id", publicId)
    formData.append("timestamp", String(timestamp))
    formData.append("signature", signature)
    formData.append("api_key", API_KEY)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(`${BASE_URL}/image/upload`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      console.warn("[cloudinary] Upload failed, falling back to local. Status:", res.status)
      return saveLocal(buffer, filename)
    }

    const data = await res.json()
    return data.secure_url || data.url || (await saveLocal(buffer, filename))
  } catch (error) {
    console.warn("[cloudinary] Upload error, falling back to local:", error)
    return saveLocal(buffer, filename)
  }
}

export async function deleteImage(publicUrl: string): Promise<boolean> {
  if (publicUrl.startsWith("/uploads/")) {
    await deleteLocal(publicUrl)
    return true
  }

  if (!API_KEY || !API_SECRET || !publicUrl.includes("res.cloudinary.com")) {
    return true
  }

  const segments = publicUrl.split("/")
  const publicIdWithExt = segments.slice(segments.indexOf(CLOUD_NAME) + 2).join("/")
  const publicId = publicIdWithExt.replace(/\.[^.]+$/, "")

  const timestamp = Math.floor(Date.now() / 1000)
  const signatureStr = `public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`
  const signature = await sha1(signatureStr)

  try {
    const formData = new FormData()
    formData.append("public_id", publicId)
    formData.append("timestamp", String(timestamp))
    formData.append("signature", signature)
    formData.append("api_key", API_KEY)

    const res = await fetch(`${BASE_URL}/image/destroy`, {
      method: "POST",
      body: formData,
    })

    return res.ok
  } catch (error) {
    console.warn("[cloudinary] Delete error:", error)
    return false
  }
}
