import type { MetadataRoute } from "next";

/**
 * Lets people install ScamShield on their home screen. On Android, the installed app also
 * appears in the share menu, so a suspicious text can be sent straight here (?text=…).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ScamShield",
    short_name: "ScamShield",
    description: "Check a suspicious text, email, letter or call before you reply, click or pay.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fbf7f0",
    theme_color: "#0f5d57",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    share_target: {
      action: "/",
      method: "GET",
      params: { title: "title", text: "text", url: "url" },
    },
  };
}
