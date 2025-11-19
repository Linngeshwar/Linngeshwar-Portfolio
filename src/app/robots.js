export default function robots() {
  const baseUrl = "https://linngeshwar-portfolio.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        crawlDelay: 10,
      },
      // Hey there curious developer! 🤖
      // If you're reading this, you're either:
      // a) A bot (in which case... can you read comments?)
      // b) A human checking my robots.txt (respect! 🫡)
      // c) Lost and confused (same tbh)
      // Either way, thanks for stopping by - Linngeshwar
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
