"use client"

import { useEffect, useState, useCallback, type DragEvent, type ChangeEvent } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Plus,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  Star,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ListFilter,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  _id: string
  id: string
  title: string
  slug: string
  division: string
  shortDescription: string
  description: string
  location: string
  status: "Completed" | "Ongoing" | "Upcoming"
  coverImage: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface FormData {
  title: string
  slug: string
  shortDescription: string
  description: string
  location: string
  status: "Completed" | "Ongoing" | "Upcoming"
  coverImage: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  displayOrder: number
}

const emptyForm: FormData = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  location: "",
  status: "Completed",
  coverImage: "",
  galleryImages: [],
  featured: false,
  published: true,
  displayOrder: 0,
}

const STATUS_COLORS: Record<string, string> = {
  Completed: "bg-green-100 text-green-800",
  Ongoing: "bg-blue-100 text-blue-800",
  Upcoming: "bg-yellow-100 text-yellow-800",
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch("/api/our-works/upload", { method: "POST", body: fd })
  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()
  return data.url
}

export default function AdminOurWorksPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [featuredFilter, setFeaturedFilter] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState("")

  const [showView, setShowView] = useState(false)
  const [viewProject, setViewProject] = useState<Project | null>(null)

  const [showDelete, setShowDelete] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [coverDragOver, setCoverDragOver] = useState(false)
  const [galleryDragOver, setGalleryDragOver] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)

  const fetchProjects = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ admin: "true", page: String(page), limit: "20", division: "OTC" })
      if (search) params.set("search", search)
      if (statusFilter) params.set("status", statusFilter)
      if (featuredFilter) params.set("featured", featuredFilter)
      const res = await fetch(`/api/our-works?${params}`)
      const data = await res.json()
      setProjects(data.works || [])
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 })
    } catch (err) {
      console.error("Failed to fetch projects:", err)
    } finally {
      setLoading(false)
    }
  }, [search, statusFilter, featuredFilter])

  useEffect(() => {
    fetchProjects(1)
  }, [fetchProjects])

  const openAddForm = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setFormError("")
    setShowForm(true)
  }

  const openEditForm = async (id: string) => {
    setFormError("")
    try {
      const res = await fetch(`/api/our-works/${id}`)
      if (!res.ok) throw new Error("Not found")
      const p: Project = await res.json()
      setEditingId(id)
      setFormData({
        title: p.title,
        slug: p.slug,
        shortDescription: p.shortDescription,
        description: p.description,
        location: p.location,
        status: p.status,
        coverImage: p.coverImage,
        galleryImages: p.galleryImages,
        featured: p.featured,
        published: p.published,
        displayOrder: p.displayOrder,
      })
      setShowForm(true)
    } catch {
      setFormError("Failed to load project")
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setFormError("Title is required")
      return
    }
    setSaving(true)
    setFormError("")

    const finalSlug = formData.slug || slugify(formData.title)

    try {
      const body = { ...formData, slug: finalSlug, division: "OTC" }
      const url = editingId ? `/api/our-works/${editingId}` : "/api/our-works"
      const method = editingId ? "PUT" : "POST"
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) {
        setFormError(data.error || "Failed to save")
        return
      }
      setShowForm(false)
      fetchProjects(pagination.page)
    } catch {
      setFormError("Network error")
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setShowDelete(true)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await fetch(`/api/our-works/${deleteId}`, { method: "DELETE" })
      setShowDelete(false)
      setDeleteId(null)
      fetchProjects(pagination.page)
    } catch {
      console.error("Delete failed")
    } finally {
      setDeleting(false)
    }
  }

  const handleCoverUpload = async (file: File) => {
    setUploadingCover(true)
    try {
      const url = await uploadFile(file)
      setFormData((prev) => ({ ...prev, coverImage: url }))
    } catch {
      setFormError("Cover upload failed")
    } finally {
      setUploadingCover(false)
    }
  }

  const handleGalleryUpload = async (file: File) => {
    setUploadingGallery(true)
    try {
      const url = await uploadFile(file)
      setFormData((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, url] }))
    } catch {
      setFormError("Gallery upload failed")
    } finally {
      setUploadingGallery(false)
    }
  }

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }))
  }

  const handleCoverDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setCoverDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith("image/")) handleCoverUpload(file)
  }

  const handleGalleryDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setGalleryDragOver(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"))
    files.forEach((f) => handleGalleryUpload(f))
  }

  const viewDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/our-works/${id}`)
      if (!res.ok) throw new Error("Not found")
      const p: Project = await res.json()
      setViewProject(p)
      setShowView(true)
    } catch {
      console.error("Failed to load project details")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#16211c]">Our Works</h1>
          <p className="mt-1 text-sm text-[#617067]">Manage portfolio projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={openAddForm}
          className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#c4a030]"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </motion.button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#617067]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white py-2.5 pl-10 pr-4 text-sm text-[#16211c] placeholder:text-[#617067] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
          />
        </div>
        <div className="flex items-center gap-2">
          <ListFilter className="h-4 w-4 text-[#617067]" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
          </select>
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37]"
          >
            <option value="">All Projects</option>
            <option value="true">Featured</option>
            <option value="false">Non-Featured</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-[rgba(22,33,28,0.1)] bg-white px-6 py-16 text-center">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-[#617067]" />
          <p className="text-sm font-medium text-[#617067]">No projects found</p>
          <p className="mt-1 text-xs text-[#617067]/70">Add your first project to get started.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-[rgba(22,33,28,0.1)] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(22,33,28,0.1)] bg-[#f6f3ea]/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#617067]">Project</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#617067] hidden md:table-cell">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#617067] hidden lg:table-cell">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[#617067]">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#617067]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(22,33,28,0.06)]">
                <AnimatePresence mode="popLayout">
                  {projects.map((project) => (
                    <motion.tr
                      key={project._id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="hover:bg-[rgba(22,33,28,0.02)] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[#ebe7da]">
                            {project.coverImage ? (
                              <img src={project.coverImage} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[#617067]/40">
                                <Upload className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="truncate font-medium text-[#16211c]">{project.title}</span>
                              {project.featured && <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />}
                            </div>
                            <span className="text-xs text-[#617067]">/{project.slug}</span>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3">
                        <p className="max-w-xs truncate text-[#617067]">
                          {project.shortDescription || project.description || "—"}
                        </p>
                      </td>
                      <td className="hidden lg:table-cell px-4 py-3 text-[#617067]">
                        {project.location || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLORS[project.status] || "bg-gray-100 text-gray-800")}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => viewDetails(project._id)} className="rounded-lg p-2 text-[#617067] transition-colors hover:bg-[rgba(22,33,28,0.06)] hover:text-[#16211c]" title="View">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => openEditForm(project._id)} className="rounded-lg p-2 text-[#617067] transition-colors hover:bg-[rgba(22,33,28,0.06)] hover:text-[#16211c]" title="Edit">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => confirmDelete(project._id)} className="rounded-lg p-2 text-[#617067] transition-colors hover:bg-red-50 hover:text-red-600" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => fetchProjects(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="rounded-lg border border-[rgba(22,33,28,0.14)] bg-white p-2 text-[#617067] transition-colors hover:bg-[#f6f3ea] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 text-sm text-[#617067]">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchProjects(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="rounded-lg border border-[rgba(22,33,28,0.14)] bg-white p-2 text-[#617067] transition-colors hover:bg-[#f6f3ea] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#16211c]">
                  {editingId ? "Edit Project" : "Add Project"}
                </h2>
                <button onClick={() => setShowForm(false)} className="rounded-lg p-1.5 text-[#617067] hover:bg-[rgba(22,33,28,0.06)]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {formError && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {formError}
                </div>
              )}

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Title *</label>
                    <input
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setFormData((prev) => ({
                          ...prev,
                          title,
                          slug: editingId ? prev.slug : slugify(title),
                        }))
                      }}
                      className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Slug</label>
                    <input
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                      placeholder="auto-generated"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Short Description</label>
                    <input
                      value={formData.shortDescription}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
                      className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                      placeholder="Brief description"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Location</label>
                    <input
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                      placeholder="Location"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 resize-none"
                    placeholder="Full description"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as FormData["status"] }))}
                      className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Display Order</label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                      className="w-full rounded-lg border border-[rgba(22,33,28,0.14)] bg-white px-3 py-2.5 text-sm text-[#16211c] outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                    />
                  </div>
                  <div className="flex items-end gap-3 pb-1">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                        className="h-4 w-4 accent-[#D4AF37]"
                      />
                      <span className="text-sm text-[#617067]">Featured</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                        className="h-4 w-4 accent-[#D4AF37]"
                      />
                      <span className="text-sm text-[#617067]">Published</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Cover Image</label>
                  <div
                    onDrop={handleCoverDrop}
                    onDragOver={(e) => { e.preventDefault(); setCoverDragOver(true) }}
                    onDragLeave={() => setCoverDragOver(false)}
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
                      coverDragOver ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-[rgba(22,33,28,0.14)] bg-white"
                    )}
                  >
                    {uploadingCover ? (
                      <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                    ) : formData.coverImage ? (
                      <div className="relative w-full max-w-xs">
                        <img src={formData.coverImage} alt="Cover" className="h-32 w-full rounded-lg object-cover" />
                        <button
                          onClick={() => setFormData((prev) => ({ ...prev, coverImage: "" }))}
                          className="absolute -right-2 -top-2 rounded-full bg-red-500 p-0.5 text-white shadow-sm hover:bg-red-600"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mb-2 h-6 w-6 text-[#617067]" />
                        <p className="text-sm text-[#617067]">Drop cover image here or click to browse</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleCoverUpload(file)
                          }}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#617067]">Gallery Images</label>
                  <div
                    onDrop={handleGalleryDrop}
                    onDragOver={(e) => { e.preventDefault(); setGalleryDragOver(true) }}
                    onDragLeave={() => setGalleryDragOver(false)}
                    className={cn(
                      "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors",
                      galleryDragOver ? "border-[#D4AF37] bg-[#D4AF37]/5" : "border-[rgba(22,33,28,0.14)] bg-white"
                    )}
                  >
                    {uploadingGallery ? (
                      <Loader2 className="h-8 w-8 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <Upload className="mb-2 h-6 w-6 text-[#617067]" />
                        <p className="text-sm text-[#617067]">Drop gallery images here or click to browse</p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            files.forEach((f) => handleGalleryUpload(f))
                          }}
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </>
                    )}
                  </div>
                  {formData.galleryImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {formData.galleryImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-lg bg-[#ebe7da]">
                          <img src={img} alt="" className="h-full w-full object-cover" />
                          <button
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute right-0.5 top-0.5 rounded-full bg-red-500 p-0.5 text-white shadow-sm hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-[rgba(22,33,28,0.1)] pt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#617067] transition-colors hover:bg-[rgba(22,33,28,0.06)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c4a030] disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showView && viewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10"
            onClick={(e) => { if (e.target === e.currentTarget) setShowView(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#16211c]">{viewProject.title}</h2>
                <button onClick={() => setShowView(false)} className="rounded-lg p-1.5 text-[#617067] hover:bg-[rgba(22,33,28,0.06)]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                {viewProject.coverImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#ebe7da]">
                    <img src={viewProject.coverImage} alt={viewProject.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Slug</span>
                    <p className="text-[#16211c]">/{viewProject.slug}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Division</span>
                    <p className="text-[#16211c]">{viewProject.division}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Status</span>
                    <span className={cn("inline-block mt-0.5 rounded-full px-2.5 py-0.5 text-xs font-medium", STATUS_COLORS[viewProject.status])}>{viewProject.status}</span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Location</span>
                    <p className="text-[#16211c]">{viewProject.location || "—"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Featured</span>
                    <p className="text-[#16211c]">{viewProject.featured ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Published</span>
                    <p className="text-[#16211c]">{viewProject.published ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Display Order</span>
                    <p className="text-[#16211c]">{viewProject.displayOrder}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Created</span>
                    <p className="text-[#16211c]">{new Date(viewProject.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {(viewProject.shortDescription || viewProject.description) && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Description</span>
                    <p className="mt-1 text-sm text-[#617067]">{viewProject.shortDescription || viewProject.description}</p>
                  </div>
                )}
                {viewProject.galleryImages && viewProject.galleryImages.length > 0 && (
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#617067]">Gallery ({viewProject.galleryImages.length})</span>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {viewProject.galleryImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-lg bg-[#ebe7da]">
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end border-t border-[rgba(22,33,28,0.1)] pt-4">
                <button
                  onClick={() => setShowView(false)}
                  className="rounded-lg bg-[#D4AF37] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c4a030]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) { setShowDelete(false); setDeleteId(null) } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl text-center"
            >
              <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
              <h3 className="text-lg font-bold text-[#16211c]">Delete Project</h3>
              <p className="mt-1 text-sm text-[#617067]">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => { setShowDelete(false); setDeleteId(null) }}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#617067] transition-colors hover:bg-[rgba(22,33,28,0.06)]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
