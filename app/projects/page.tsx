import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = process.env.UPSTASH_REDIS_REST_URL ? Redis.fromEnv() : null;

// Revalidate every 1 hour instead of 60 seconds (view count tidak perlu real-time)
export const revalidate = 3600;
export default async function ProjectsPage() {
  let views: Record<string, number> = {};

  if (redis) {
    try {
      const viewsData = await redis.mget<number[]>(
        ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":"))
      );
      views = viewsData.reduce((acc, v, i) => {
        acc[allProjects[i].slug] = v ?? 0;
        return acc;
      }, {} as Record<string, number>);
    } catch (error) {
      console.warn("Redis not available, using default view counts");
      views = allProjects.reduce((acc, p) => {
        acc[p.slug] = 0;
        return acc;
      }, {} as Record<string, number>);
    }
  } else {
    // No Redis configured, use default view counts
    views = allProjects.reduce((acc, p) => {
      acc[p.slug] = 0;
      return acc;
    }, {} as Record<string, number>);
  }

  const featured = allProjects.find(
    (project) => project.slug === "excavator-operations"
  )!;
  const top2 = allProjects.find(
    (project) => project.slug === "nickel-mining-operations"
  );
  const top3 = allProjects.find(
    (project) => project.slug === "safety-implementation"
  );
  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        project.slug !== featured.slug &&
        project.slug !== top2?.slug &&
        project.slug !== top3?.slug
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      {/* Mobile-optimized container with better spacing */}
      <div className="px-4 sm:px-6 pt-16 sm:pt-20 mx-auto space-y-6 sm:space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        {/* Mobile-optimized header */}
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl lg:text-5xl">
            Projects
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
            Showcasing professional excellence through real-world mining
            operations and safety management projects.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {/* Mobile-optimized grid layout */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 mx-auto lg:grid-cols-2">
          <Card>
            <Link href="/resume">
              <article className="relative w-full h-full p-6 sm:p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-zinc-100 group-hover:text-white md:text-4xl font-display tracking-tight"
                >
                  {featured.title}
                </h2>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 sm:bottom-4 md:bottom-8">
                  <p className="text-sm sm:text-base text-zinc-200 hover:text-zinc-50">
                    View Resume <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-6 sm:gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 pt-6 lg:pt-0">
            {[top2, top3].filter(Boolean).map((project) => (
              <Card key={project!.slug}>
                <Article project={project!} views={views[project!.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        {/* Mobile-optimized grid for remaining projects */}
        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 sm:grid-cols-2 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
