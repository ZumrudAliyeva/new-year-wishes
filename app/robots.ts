import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/admin/", "/merlinsecret-xyz123", "/merlinsecret-xyz123/"],
      },
    ],
  };
}
