'use client'
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface PaginationControlsProps {
    nextPageToken?: string;
    currentPage: number;
    prevTokens: string[];
}

export default function PaginationControls({
                                               nextPageToken,
                                               currentPage,
                                               prevTokens
                                           }: PaginationControlsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const buildHref = (direction: 'prev' | 'next') => {
        const params = new URLSearchParams(searchParams.toString());

        if (direction === 'prev') {
            const prevToken = prevTokens[currentPage - 2] || '';
            params.set('pageToken', prevToken);
            params.set('page', `${currentPage - 1}`);
            params.set('prevTokens', JSON.stringify(prevTokens.slice(0, -1)));
        } else {
            const newPrevTokens = [...prevTokens, searchParams.get('pageToken') || ''];
            params.set('pageToken', nextPageToken || '');
            params.set('page', `${currentPage + 1}`);
            params.set('prevTokens', JSON.stringify(newPrevTokens));
        }

        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="mt-12 flex justify-between items-center">
            <div>
                {currentPage > 1 ? (
                    <Link
                        href={buildHref('prev')}
                        scroll={false}
                        className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md
              bg-sky-800/20 text-sky-300 hover:bg-gray-700
              transition-colors"
                    >
                        &larr; Previous
                    </Link>
                ) : (
                    <button
                        disabled
                        className="px-4 py-2 border border-gray-700 rounded-md
            bg-sky-800/20 text-sky-600 cursor-not-allowed"
                    >
                        &larr; Previous
                    </button>
                )}
            </div>

            <div className="text-sm text-gray-400">
                Page {currentPage}
            </div>

            <div>
                {nextPageToken ? (
                    <Link
                        href={buildHref('next')}
                        scroll={false}
                        className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md
              bg-sky-800/20 text-sky-300 hover:bg-gray-700
              transition-colors"
                    >
                        Next &rarr;
                    </Link>
                ) : (
                    <button
                        disabled
                        className="px-4 py-2 border border-gray-700 rounded-md
            bg-sky-800/20 text-sky-600 cursor-not-allowed"
                    >
                        Next &rarr;
                    </button>
                )}
            </div>
        </div>
    );
}