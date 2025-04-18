import { fetchPosts } from "@/app/lib/blogger";
import BlogCard from "@/app/components/blog/BlogCard";
import PaginationControls from "@/app/components/blog/PaginationControls";

interface BlogPageProps {
    searchParams?: {
        pageToken?: string;
        page?: string;
        prevTokens?: string;
    };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    // Menggunakan Promise.resolve untuk menangani searchParams secara asinkron
    const awaitedParams = await Promise.resolve(searchParams || {});

    // Menggunakan nullish coalescing operator untuk nilai default yang lebih aman
    const pageToken = awaitedParams?.pageToken ?? '';
    const currentPage = parseInt(awaitedParams?.page ?? '1', 10);
    const prevTokens = JSON.parse(awaitedParams?.prevTokens ?? '[]');

    const { posts, nextPageToken } = await fetchPosts(pageToken);

    return (
        <div className="container mx-auto px-4 py-24 max-w-3xl lg:py-24 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-sky-300 mb-2">
                    Latest Articles
                </h1>
                <p className="text-sky-500 mb-5">
                    Explore my writing collection, this data is taken from the blogger API
                </p>
                <a 
  href="https://www.himang.my.id/" 
  className="inline-block px-4 py-2 rounded-lg border border-sky-500/30 bg-sky-800/20 text-blue-400 hover:text-blue-300 hover:bg-sky-800/30 transition-all duration-300 hover:shadow-[0_0_8px_rgba(56,189,248,0.3)]"
>
  Himang.my.id
</a>
            </header>

            <div className="space-y-6">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">No articles available</p>
                </div>
            )}

            <PaginationControls
                nextPageToken={nextPageToken}
                currentPage={currentPage}
                prevTokens={prevTokens}
            />
        </div>
    );
}