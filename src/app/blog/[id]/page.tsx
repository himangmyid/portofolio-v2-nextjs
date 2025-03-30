import { Metadata } from 'next';
import { fetchPostById, fetchAllPosts } from "@/app/lib/blogger";
import AuthorCard from "@/app/components/blog/AuthorCard";
import Image from "next/image";
import DOMPurify from 'isomorphic-dompurify';
import Link from "next/link";
import type { BlogPost } from "@/app/lib/blogger";

// Perbaikan 1: Update tipe Props untuk Next.js 15
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Perbaikan 2: Gunakan await untuk params
    const { id } = await params;
    const post = await fetchPostById(id);

    const rawDescription = post?.content || 'Blog post details';
    const cleanDescription = DOMPurify.sanitize(rawDescription, {
      ALLOWED_TAGS: []
    }).slice(0, 160);

    return {
      title: post?.title || 'Blog Post',
      description: cleanDescription,
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
      openGraph: {
        title: post?.title,
        description: cleanDescription,
        images: post?.images?.[0]?.url ? [
          {
            url: post.images[0].url,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : []
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Blog post details'
    };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await fetchAllPosts();
    return posts.map((post: BlogPost) => ({
      id: post.id.toString()
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Perbaikan 3: Update komponen utama
export default async function BlogDetailPage({ params }: Props) {
  try {
    // Perbaikan 4: Gunakan await untuk params
    const { id } = await params;
    const post = await fetchPostById(id);

    if (!post) {
      return (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500 text-xl">Post not found</p>
          </div>
      );
    }

    const cleanContent = DOMPurify.sanitize(post.content);

    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
          <article className="bg-white dark:bg-sky-800/20 rounded-xl shadow-lg p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              {post.title}
            </h1>

            <div className="mb-6">
              <AuthorCard author={post.author} date={post.published} />
            </div>

            {post.images?.map((img: { url: string }, index: number) => (
                <div key={index} className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                  <Image
                      src={img.url}
                      alt={`Article image - ${post.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                  />
                </div>
            ))}

            <div
                className="prose dark:prose-invert prose-lg max-w-none
              prose-headings:text-gray-800 dark:prose-headings:text-white
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            <div className="mt-12">
              <Link
                  href="/blog"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                &larr; Back to Blog
              </Link>
            </div>
          </article>
        </main>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-xl">Error loading post</p>
        </div>
    );
  }
}