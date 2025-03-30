interface BloggerPost {
  id?: string;
  title?: string;
  published?: string;
  content?: string;
  images?: Array<{ url?: string }>;
  author?: {
    displayName?: string;
    image?: { url?: string };
  };
}

export interface BlogPost {
  id: string;
  title: string;
  published: string;
  content: string;
  images: { url: string }[];
  author: {
    displayName: string;
    image: { url: string };
  };
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

const BLOG_ID = getEnvVar('NEXT_PUBLIC_BLOGGER_BLOG_ID');
const API_KEY = getEnvVar('NEXT_PUBLIC_BLOGGER_API_KEY');
const BLOG_BASE_URL = getEnvVar('NEXT_PUBLIC_BLOG_BASE_URL');

const sanitizeUrl = (url?: string): string => {
  if (!url) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzNzQwNTEiLz48L3N2Zz4=';
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `${BLOG_BASE_URL}${url}`;
  return url;
};

const transformPost = (item: BloggerPost): BlogPost => ({
  id: item.id || crypto.randomUUID(),
  title: item.title || 'Untitled Post',
  published: item.published || new Date().toISOString(),
  content: item.content || '',
  images: (item.images || []).map(img => ({
    url: sanitizeUrl(img?.url)
  })),
  author: {
    displayName: item.author?.displayName || 'Anonymous Author',
    image: {
      url: sanitizeUrl(item.author?.image?.url)
    }
  }
});

// Fungsi untuk mendapatkan semua post
export const fetchAllPosts = async (): Promise<BlogPost[]> => {
  try {
    const url = new URL(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('maxResults', '500');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return (data.items || []).map(transformPost);
  } catch (error) {
    console.error('Blogger API Error:', error);
    return [];
  }
};

// Fungsi untuk mendapatkan post by ID
export const fetchPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const res = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${id}?key=${API_KEY}`,
        { next: { revalidate: 3600 } }
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    return transformPost(data);
  } catch (error) {
    console.error('[fetchPostById] Error:', error);
    return null;
  }
};

// Fungsi untuk pagination
export const fetchPosts = async (pageToken?: string): Promise<{
  posts: BlogPost[];
  nextPageToken?: string;
}> => {
  try {
    const url = new URL(`https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('maxResults', '6');
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    return {
      posts: (data.items || []).map(transformPost),
      nextPageToken: data.nextPageToken
    };
  } catch (error) {
    console.error('Blogger API Error:', error);
    return { posts: [] };
  }
};