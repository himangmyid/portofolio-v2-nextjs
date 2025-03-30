import Link from "next/link";
import { BlogPost } from "@/app/lib/blogger";

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <article className="group bg-white dark:bg-sky-800/20 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.published}>
              {new Date(post.published).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </time>
          </div>
          
          <Link 
            href={`/blog/${post.id}`}
            className="inline-block"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-3">
              {post.title}
            </h2>
          </Link>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            By {post.author.displayName}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;