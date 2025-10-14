import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "@/app/projects/[slug]/header";
import "@/app/projects/[slug]/mdx.css";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { getBreadcrumbSchema, renderJsonLd } from "@/app/lib/structured-data";
import { Calendar, Clock, Tag, User } from "lucide-react";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allBlogs
    .filter((b) => b.published)
    .map((b) => ({
      slug: b.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    return {};
  }

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author || "Muhammad Nurhidayat Gani"],
      tags: blog.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slug === slug);

  if (!blog) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: blog.title, url: `${baseUrl}/blog/${slug}` },
  ]);

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    author: {
      "@type": "Person",
      name: blog.author || "Muhammad Nurhidayat Gani",
    },
    datePublished: blog.date,
    keywords: blog.tags?.join(", "),
    articleSection: blog.category,
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(articleSchema)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
      />

      <div className="bg-zinc-50 min-h-screen">
        <Breadcrumbs />
        
        <Header blog={blog} />
        
        {/* Article Meta Information */}
        <div className="max-w-4xl mx-auto px-6 mt-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={new Date(blog.date).toISOString()}>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            
            {blog.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readingTime} min read</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author || "Muhammad Nurhidayat Gani"}</span>
            </div>
            
            {blog.category && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span>{blog.category}</span>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-zinc-100 text-zinc-700 border border-zinc-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <article
          id="article-content"
          className="px-6 py-12 mx-auto prose prose-zinc prose-quoteless max-w-4xl"
        >
          <Mdx code={blog.body.code} />
        </article>

        {/* Back to Blog Link */}
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <a
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>
    </>
  );
}
