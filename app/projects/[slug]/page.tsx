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
        <div className="container mx-auto px-4 py-8">
          <ProjectHero
            image={heroImage}
            title={project.title}
            subtitle={project.description}
          />
        </div>
      )}

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={project.body.code} />
        
        {images.length > 0 && (
          <div className="not-prose my-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Project Gallery</h2>
            <ImageGallery images={images} />
          </div>
        )}
      </article>
    </div>
  );
}
