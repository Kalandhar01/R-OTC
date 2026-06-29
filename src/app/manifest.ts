import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ractysh Associates Pvt Ltd",
    short_name: "Ractysh Associates",
    description:
      "Ractysh Associates Private Limited provides OTC services, business consulting, trade facilitation, corporate advisory, financial support, and intermediary business solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ea",
    theme_color: "#16211c",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
