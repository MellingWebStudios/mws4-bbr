import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap Viewer - Birmingham Boiler Repairs",
  description: "Browse all pages and services available on Birmingham Boiler Repairs website.",
  robots: "noindex, nofollow",
};

export default function SitemapViewer() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Sitemap Viewer</h1>
          <p className="text-gray-600">
            Browse all pages and services available on our website.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Main Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/" className="block hover:text-primary">Home</Link>
                <Link href="/about" className="block hover:text-primary">About</Link>
                <Link href="/services" className="block hover:text-primary">Services</Link>
                <Link href="/locations" className="block hover:text-primary">Locations</Link>
                <Link href="/prices" className="block hover:text-primary">Prices</Link>
                <Link href="/contact" className="block hover:text-primary">Contact</Link>
                <Link href="/blog" className="block hover:text-primary">Blog</Link>
                <Link href="/gas-safety-guide" className="block hover:text-primary">Gas Safety Guide</Link>
                <Link href="/privacy-policy" className="block hover:text-primary">Privacy Policy</Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Sitemaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link 
                  href="/sitemap.xml" 
                  className="block hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Main Sitemap (XML)
                </Link>
                <Link 
                  href="/sitemap-blog.xml" 
                  className="block hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blog Sitemap (XML)
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            For the complete list of all pages, view our{" "}
            <Link href="/sitemap.xml" className="text-primary hover:underline">
              XML sitemap
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
