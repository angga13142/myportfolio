import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import { ImageGallery, ProjectHero } from "@/app/components/project-images";
import { getProjectImages, getHeroImage } from "../project-images";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = process.env.UPSTASH_REDIS_REST_URL 
  ? Redis.fromEnv()
  : null;

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  let views = 0;
  if (redis) {
    try {
      views = (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;
    } catch (error) {
      console.warn("Redis not available, using default view count");
      views = 0;
    }
  }

  const images = getProjectImages(slug);
  const heroImage = getHeroImage(slug);

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      {heroImage && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <ProjectHero
            image={heroImage}
            title={project.title}
            subtitle={project.description}
          />
        </div>
      )}

      {/* Mobile-optimized article container */}
      <article className="px-4 sm:px-6 py-8 sm:py-12 mx-auto prose prose-zinc prose-quoteless
        prose-headings:text-zinc-900 prose-headings:font-bold
        prose-p:text-zinc-700 prose-p:leading-relaxed
        prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
        prose-ul:my-4 prose-li:my-2
        max-w-4xl">
        <Mdx code={project.body.code} />
        
        {images.length > 0 && (
          <div className="not-prose my-8 sm:my-12">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-4 sm:mb-6">Project Gallery</h2>
            <ImageGallery images={images} />
          </div>
        )}
      </article>
    </div>
  );
}
