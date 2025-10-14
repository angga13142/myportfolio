import type { Blog } from "contentlayer/generated";
import Link from "next/link";
import { Eye, Clock, Calendar } from "lucide-react";

type Props = {
  blog: Blog;
  views?: number;
};

export const Article: React.FC<Props> = ({ blog, views }) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
      <article className="p-4 md:p-8">
        <div className="flex justify-between gap-2 items-start">
          <div>
            <div className="flex items-center gap-3 text-xs text-zinc-100">
              <Calendar className="w-3 h-3" />
              <time dateTime={new Date(blog.date).toISOString()}>
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            {blog.category && (
              <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-300">
                {blog.category}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            {blog.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {blog.readingTime} min
              </span>
            )}
            {views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
              </span>
            )}
          </div>
        </div>
        
        <h2 className="z-20 text-xl font-medium duration-1000 lg:text-2xl text-zinc-200 group-hover:text-white font-display">
          {blog.title}
        </h2>
        <p className="z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {blog.description}
        </p>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-900 text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
};
