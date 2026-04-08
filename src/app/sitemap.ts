import type { MetadataRoute } from "next";
import { MOCK_BLOGS, MOCK_EVENTS, MOCK_THREADS } from "@/lib/mock-data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fightersinsight.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/blogs",
    "/live",
    "/forum",
    "/start-training",
    "/gear",
    "/about",
    "/contact",
    "/partner",
    "/advertise",
    "/faq",
    "/guidelines",
    "/safety",
    "/privacy",
    "/terms",
    "/cookies",
    "/sign-in",
    "/register",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const blogRoutes = MOCK_BLOGS.map((b) => ({
    url: `${BASE}/blogs/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const eventRoutes = MOCK_EVENTS.map((e) => ({
    url: `${BASE}/live/${e.slug}`,
    lastModified: new Date(e.startTime),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const threadRoutes = MOCK_THREADS.map((t) => ({
    url: `${BASE}/forum/thread/${t.slug}`,
    lastModified: new Date(t.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...eventRoutes, ...threadRoutes];
}
