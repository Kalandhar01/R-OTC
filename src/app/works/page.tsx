import type { Metadata } from "next"
import NavbarDemo from "@/components/navbar-menu-demo"
import SiteFooter from "@/components/site-footer"
import { getProjectsByDivision } from "@/lib/our-works"
import { SITE_URL, COMPANY_NAME } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Our Works | Ractysh Associates Pvt Ltd",
  description: "Explore the portfolio of Ractysh Associates Private Limited showcasing OTC transactions, business consulting engagements, and completed mandates.",
  alternates: {
    canonical: `${SITE_URL}/works`,
  },
  openGraph: {
    title: "Our Works — Portfolio | Ractysh Associates Pvt Ltd",
    description: "Explore the portfolio of Ractysh Associates Private Limited showcasing OTC transactions, business consulting engagements, and completed mandates.",
    url: `${SITE_URL}/works`,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: COMPANY_NAME,
      },
    ],
  },
}

interface ProjectItem {
  id: string
  title: string
  slug: string
  location: string
  description: string
  coverImage: string
}

export default async function WorksPage() {
  const raw = await getProjectsByDivision("OTC")
  const projects: ProjectItem[] = raw.map((p) => ({
    id: p._id, title: p.title, slug: p.slug, location: p.location,
    description: p.shortDescription || p.description,
    coverImage: p.coverImage,
  }))

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <NavbarDemo />
      <section className="px-5 pb-20 pt-32 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Our Works</h1>
          <p className="mb-12 max-w-2xl text-lg text-slate-500">
            OTC exchange desk portfolio and completed mandates.
          </p>
          {projects.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <p className="text-sm font-medium text-slate-500">No projects are available yet.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <a
                  key={project.id}
                  href={`/works/${project.slug}`}
                  className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animation: `fadeIn 0.5s ease-out ${i * 0.1}s both` }}
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    {project.coverImage && (
                      <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-950">{project.title}</h3>
                    {project.location && <p className="mt-1 text-sm text-slate-500">{project.location}</p>}
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
