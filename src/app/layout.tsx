import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://fightersinsight.com"),
  title: {
    default: "The Fighter's Insight — Fight News, Live Reactions, Community & Training",
    template: "%s · The Fighter's Insight",
  },
  description:
    "Fight blogs, live event reactions, community forums, gym discovery, and gear reviews — all in one place. Built for hardcore fight fans and total beginners.",
  keywords: [
    "MMA",
    "UFC",
    "boxing",
    "Muay Thai",
    "BJJ",
    "fight news",
    "live event",
    "gym finder",
    "boxing gloves",
  ],
  openGraph: {
    title: "The Fighter's Insight",
    description:
      "Where fight fans think deeper. Blogs, live reactions, community, training, and gear.",
    url: "https://fightersinsight.com",
    siteName: "The Fighter's Insight",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Fighter's Insight",
    description: "Where fight fans think deeper.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
