// TODO: Revisar
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Blackanderlust Landing",
    short_name: "Blackanderlust",
    description: "Agencia creativa especializada en experiencias digitales",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
