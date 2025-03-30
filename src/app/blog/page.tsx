import BlogPage from "@/app/components/blog/BlogPage";

export const dynamic = 'force-dynamic';

export default function BlogListPage({
                                         searchParams,
                                     }: {
    searchParams?: {
        pageToken?: string;
        page?: string;
        prevTokens?: string;
    };
}) {
    return (
        <section className="min-h-screen bg-gray-50 dark:bg-sky-900/20">
            <BlogPage searchParams={searchParams} />
        </section>
    );
}