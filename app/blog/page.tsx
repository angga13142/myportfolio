import Link from "next/link";
import React from "react";
import { allBlogs } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Eye, Clock, Calendar } from "lucide-react";

// Revalidate every 1 hour instead of 60 seconds
export const revalidate = 3600;

export const metadata = {
  title: "Blog - Heavy Equipment Operations & Safety",
  description:
    "Articles and insights on heavy equipment operations, safety management, productivity optimization, and best practices from a professional excavator operator.",
  keywords: [
    "heavy equipment blog",
    "excavator operations",
    "safety articles",
    "productivity tips",
    "mining operations",
    "equipment maintenance",
  ],
  openGraph: {
    title: "Blog - Muhammad Nurhidayat Gani",
    description:
      "Articles and insights on heavy equipment operations and safety management.",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogs = allBlogs
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featured = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl font-display">
            Blog
          </h2>
          <p className="mt-4 text-zinc-400">
            Insights and best practices from years of heavy equipment operations
            experience.
          </p>
        </div>

        {featured && <div className="w-full h-px bg-zinc-800" />}

        {/* Featured Article */}
        {featured && (
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            <Card>
              <Link href={`/blog/${featured.slug}`}>
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-zinc-100 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {new Date(featured.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    {featured.readingTime && (
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Clock className="w-4 h-4" />
                        {featured.readingTime} min read
                      </span>
                    )}
                  </div>

                  <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                    {featured.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                    {featured.description}
                  </p>

                  {featured.tags && featured.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featured.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </Link>
            </Card>

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
              {otherBlogs.slice(0, 2).map((blog) => (
                <Card key={blog.slug}>
                  <Article blog={blog} />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Other Articles */}
        {otherBlogs.length > 2 && (
          <>
            <div className="hidden w-full h-px md:block bg-zinc-800" />
            <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
              <div className="grid grid-cols-1 gap-4">
                {otherBlogs
                  .slice(2)
                  .filter((_, i) => i % 3 === 0)
                  .map((blog) => (
                    <Card key={blog.slug}>
                      <Article blog={blog} />
                    </Card>
                  ))}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {otherBlogs
                  .slice(2)
                  .filter((_, i) => i % 3 === 1)
                  .map((blog) => (
                    <Card key={blog.slug}>
                      <Article blog={blog} />
                    </Card>
                  ))}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {otherBlogs
                  .slice(2)
                  .filter((_, i) => i % 3 === 2)
                  .map((blog) => (
                    <Card key={blog.slug}>
                      <Article blog={blog} />
                    </Card>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
