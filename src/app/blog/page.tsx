import BlogPage from "@/app/components/blog/BlogPage";

export const dynamic = 'force-dynamic';

// Update type definition untuk Next.js 15
interface PageProps {
    searchParams?: Promise<{
        pageToken?: string;
        page?: string;
        prevTokens?: string;
    }>;
}

export default async function BlogListPage({
                                               searchParams
                                           }: PageProps) {
    // Resolve promise searchParams
    const resolvedSearchParams = await searchParams;

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-sky-900/20">
            <BlogPage searchParams={resolvedSearchParams} />
        </section>
    );
}