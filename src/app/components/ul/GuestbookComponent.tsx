'use client'
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ul/uiGuesbook/button";
import { Card } from "@/app/components/ul/uiGuesbook/card";
import { Textarea } from "@/app/components/ul/uiGuesbook/textarea";
import { Avatar } from "@/app/components/ul/uiGuesbook/avatar";
import { createClient } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import Image from "next/image";

// Define types
interface GuestbookEntry {
    id: string;
    created_at: string;
    user_id: string;
    message: string;
    user_name: string;
    user_avatar_url: string;
    likes: number;
    color_class: string;
    liked_by_current_user: boolean;
}

interface GuestbookEntryFromDB {
    id: string;
    created_at: string;
    user_id: string;
    message: string;
    user_name: string;
    user_avatar_url: string;
    likes: number;
}

interface User {
    id: string;
    name: string;
    avatar_url: string;
}

// Create Supabase client with mock data for development
const supabaseUrl = process.env.SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your-anon-key";

// Create a mock Supabase client if real credentials aren't available
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Array of Tailwind color classes for usernames
const colorClasses = [
    "text-red-400",
    "text-blue-400",
    "text-green-400",
    "text-yellow-400",
    "text-purple-400",
    "text-pink-400",
    "text-indigo-400",
    "text-orange-400",
    "text-teal-400",
    "text-cyan-400",
];

// Mock data for development when Supabase isn't configured
const mockEntries = [
    {
        id: "1",
        created_at: new Date().toISOString(),
        user_id: "mock-user-1",
        message:
            "This is a sample message in the guestbook. Connect Supabase to see real data!",
        user_name: "Demo User",
        user_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
        likes: 5,
        color_class: "text-blue-400",
        liked_by_current_user: false,
    },
    {
        id: "2",
        created_at: new Date(Date.now() - 86400000).toISOString(),
        user_id: "mock-user-2",
        message: "Great portfolio! Looking forward to seeing more of your work.",
        user_name: "Sample Visitor",
        user_avatar_url:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=visitor",
        likes: 3,
        color_class: "text-purple-400",
        liked_by_current_user: true,
    },
];

export default function GuestbookPage() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [sortBy, setSortBy] = useState<"newest" | "likes">("newest");

    // Check if user is authenticated
    useEffect(() => {
        // Handle hash fragment from OAuth redirect
        const handleHashParams = async () => {
            // Check if we have a hash in the URL (from OAuth redirect)
            if (
                window.location.hash &&
                window.location.hash.includes("access_token")
            ) {
                try {
                    // Process the hash directly
                    const { data, error } = await supabase.auth.getSession();

                    if (error) {
                        console.error("Error getting session:", error);
                        return;
                    }

                    // If we have a session, set the user
                    if (data.session) {
                        const { user } = data.session;
                        setUser({
                            id: user.id,
                            name:
                                user.user_metadata.user_name ||
                                user.user_metadata.preferred_username ||
                                "Anonymous",
                            avatar_url: user.user_metadata.avatar_url || "",
                        });
                    }

                    // After processing, clean up the URL without reloading the page
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState(
                            {},
                            document.title,
                            window.location.pathname,
                        );
                    }
                } catch (err) {
                    console.error("Error processing authentication:", err);
                }
            }
        };

        const checkUser = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                const { user } = data.session;
                setUser({
                    id: user.id,
                    name:
                        user.user_metadata.user_name ||
                        user.user_metadata.preferred_username ||
                        "Anonymous",
                    avatar_url: user.user_metadata.avatar_url || "",
                });
            }
            setLoading(false);
        };

        // First handle any hash params, then check the user
        handleHashParams().then(checkUser);

        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    setUser({
                        id: session.user.id,
                        name:
                            session.user.user_metadata.user_name ||
                            session.user.user_metadata.preferred_username ||
                            "Anonymous",
                        avatar_url: session.user.user_metadata.avatar_url || "",
                    });
                } else {
                    setUser(null);
                }
            },
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    // Fetch guestbook entries
    useEffect(() => {
        // Check if we're using mock data (no Supabase credentials)
        const usingMockData = supabaseUrl === "https://example.supabase.co";

        if (usingMockData) {
            console.log("Using mock data - Supabase credentials not configured");
            setEntries(mockEntries);
            setLoading(false);
            return;
        }

        const fetchEntries = async () => {
            setLoading(true);

            // Get current user's likes
            let userLikes: string[] = [];
            if (user) {
                const { data: likesData } = await supabase
                    .from("guestbook_likes")
                    .select("entry_id")
                    .eq("user_id", user.id);

                userLikes = likesData?.map((like) => like.entry_id) || [];
            }

            // Get entries
            const { data, error } = await supabase
                .from("guestbook_entries")
                .select("*")
                .order(sortBy === "newest" ? "created_at" : "likes", {
                    ascending: false,
                });

            if (error) {
                console.error("Error fetching entries:", error);
            } else if (data) {
                // Map entries and add color class and liked status
                const mappedEntries = data.map((entry: GuestbookEntryFromDB) => ({
                    ...entry,
                    color_class:
                        colorClasses[Math.floor(Math.random() * colorClasses.length)],
                    liked_by_current_user: userLikes.includes(entry.id),
                }));

                setEntries(mappedEntries);
            }

            setLoading(false);
        };

        fetchEntries();
    }, [sortBy, user]); // Hapus mockEntries dari dependency array

    // Sign in with GitHub
    const signInWithGitHub = async () => {
        // Check if we're using mock data
        if (supabaseUrl === "https://example.supabase.co") {
            // Set a mock user when in development mode
            setUser({
                id: "mock-user-id",
                name: "Mock GitHub User",
                avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=github",
            });
            return;
        }

        try {
            await supabase.auth.signInWithOAuth({
                provider: "github",
                options: {
                    redirectTo:
                        "https://guestbook-test-git-main-himangs-projects.vercel.app/guestbook",
                },
            });
        } catch (error) {
            console.error("Error signing in with GitHub:", error);
        }
    };

    // Sign out
    const signOut = async () => {
        // Check if we're using mock data
        if (supabaseUrl === "https://example.supabase.co") {
            setUser(null);
            return;
        }

        await supabase.auth.signOut();
        setUser(null);
    };

    // Submit new entry
    const submitEntry = async (e: React.FormEvent) => {
        // Check if we're using mock data
        const usingMockData = supabaseUrl === "https://example.supabase.co";

        e.preventDefault();

        if (!user || !newMessage.trim()) return;

        setSubmitting(true);

        if (usingMockData) {
            // Create a mock entry
            const mockEntry = {
                id: `mock-${Date.now()}`,
                created_at: new Date().toISOString(),
                user_id: user.id,
                message: newMessage.trim(),
                user_name: user.name,
                user_avatar_url: user.avatar_url,
                likes: 0,
                color_class:
                    colorClasses[Math.floor(Math.random() * colorClasses.length)],
                liked_by_current_user: false,
            };

            // Add to entries
            setEntries([mockEntry, ...entries]);
            setNewMessage("");
            setSubmitting(false);
            return;
        }

        const { data, error } = await supabase
            .from("guestbook_entries")
            .insert([
                {
                    user_id: user.id,
                    message: newMessage.trim(),
                    user_name: user.name,
                    user_avatar_url: user.avatar_url,
                    likes: 0,
                },
            ])
            .select();

        if (error) {
            console.error("Error submitting entry:", error);
        } else {
            // Add the new entry to the list
            if (data && data[0]) {
                const newEntry = {
                    ...data[0],
                    color_class:
                        colorClasses[Math.floor(Math.random() * colorClasses.length)],
                    liked_by_current_user: false,
                };

                if (sortBy === "newest") {
                    setEntries([newEntry, ...entries]);
                } else {
                    // If sorting by likes, fetch all entries again to get correct order
                    const { data: refreshedData } = await supabase
                        .from("guestbook_entries")
                        .select("*")
                        .order("likes", { ascending: false });

                    if (refreshedData) {
                        const mappedEntries = refreshedData.map((entry: GuestbookEntryFromDB) => ({
                            ...entry,
                            color_class:
                                colorClasses[Math.floor(Math.random() * colorClasses.length)],
                            liked_by_current_user:
                                entry.id === newEntry.id
                                    ? false
                                    : entries.find((e) => e.id === entry.id)
                                    ?.liked_by_current_user || false,
                        }));

                        setEntries(mappedEntries);
                    }
                }

                setNewMessage("");
            }
        }

        setSubmitting(false);
    };

    // Toggle like on an entry
    const toggleLike = async (entryId: string) => {
        // Check if we're using mock data
        const usingMockData = supabaseUrl === "https://example.supabase.co";

        if (!user) {
            signInWithGitHub();
            return;
        }

        if (usingMockData) {
            // Just update the UI for mock data
            const entry = entries.find((e) => e.id === entryId);
            if (!entry) return;

            const isLiked = entry.liked_by_current_user;

            setEntries(
                entries.map((e) => {
                    if (e.id === entryId) {
                        return {
                            ...e,
                            likes: isLiked ? e.likes - 1 : e.likes + 1,
                            liked_by_current_user: !isLiked,
                        };
                    }
                    return e;
                }),
            );
            return;
        }

        const entry = entries.find((e) => e.id === entryId);
        if (!entry) return;

        const isLiked = entry.liked_by_current_user;

        // Optimistically update UI
        setEntries(
            entries.map((e) => {
                if (e.id === entryId) {
                    return {
                        ...e,
                        likes: isLiked ? e.likes - 1 : e.likes + 1,
                        liked_by_current_user: !isLiked,
                    };
                }
                return e;
            }),
        );

        if (isLiked) {
            // Remove like
            await supabase
                .from("guestbook_likes")
                .delete()
                .eq("user_id", user.id)
                .eq("entry_id", entryId);

            // Update entry like count
            await supabase
                .from("guestbook_entries")
                .update({ likes: entry.likes - 1 })
                .eq("id", entryId);
        } else {
            // Add like
            await supabase
                .from("guestbook_likes")
                .insert([{ user_id: user.id, entry_id: entryId }]);

            // Update entry like count
            await supabase
                .from("guestbook_entries")
                .update({ likes: entry.likes + 1 })
                .eq("id", entryId);
        }

        // If sorting by likes, re-sort the entries
        if (sortBy === "likes") {
            setEntries([...entries].sort((a, b) => b.likes - a.likes));
        }
    };

    return (
        <div className="min-h-screen text-white p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Guestbook</h1>
                <p className="text-gray-400 mb-8">
                    Leave a message for future visitors!
                </p>

                {/* Auth section */}
                <div className="mb-8">
                    {user ? (
                        <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <Image
                                        src={user.avatar_url}
                                        alt={user.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                </Avatar>
                                <div>
                                    <p>
                                        Signed in as{" "}
                                        <span className="font-semibold">{user.name}</span>
                                    </p>
                                </div>
                            </div>
                            <Button className="bg-sky-950" variant="outline" onClick={signOut}>
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={signInWithGitHub} className="w-full sm:w-auto">
                            <Github className="mr-2 h-4 w-4" />
                            Sign in with GitHub to comment
                        </Button>
                    )}
                </div>

                {/* New entry form */}
                {user && (
                    <Card className="mb-8 bg-sky-900/30 border-sky-800/50">
                        <form onSubmit={submitEntry} className="p-4">
                            <h2 className="text-xl font-semibold mb-4 text-amber-100">Leave a message</h2>
                            <Textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Write something nice..."
                                className="text-sky-100 mb-4 bg-sky-950/10 border-sky-800/50"
                                required
                            />
                            <Button type="submit" disabled={submitting || !newMessage.trim()}>
                                {submitting ? "Posting..." : "Post Message"}
                            </Button>
                        </form>
                    </Card>
                )}

                {/* Sorting options */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Messages</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Sort by:</span>
                        <Button
                            variant={sortBy === "newest" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSortBy("newest")}
                            className="text-xs h-8 bg-sky-950"
                        >
                            Newest
                        </Button>
                        <Button
                            variant={sortBy === "likes" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSortBy("likes")}
                            className="text-xs h-8 bg-sky-950"
                        >
                            Most Liked
                        </Button>
                    </div>
                </div>

                {/* Entries list */}
                {loading ? (
                    <div className="text-center py-8">Loading messages...</div>
                ) : entries.length === 0 ? (
                    <Card className="p-8 text-center bg-sky-900/30 border-sky-800/50 text-sky-100">
                        <p>No messages yet. Be the first to leave one!</p>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {entries.map((entry) => (
                            <Card
                                key={entry.id}
                                className="overflow-hidden bg-sky-900/30 border-sky-800/50"
                            >
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-sky-700">
                                                <Image
                                                    src={entry.user_avatar_url}
                                                    alt={entry.user_name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                            </Avatar>
                                            <div>
                                                <p className={`font-semibold ${entry.color_class}`}>
                                                    {entry.user_name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(entry.created_at).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleLike(entry.id)}
                                            className={`flex items-center gap-1 ${entry.liked_by_current_user ? "text-pink-500" : "text-gray-400"}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={
                                                    entry.liked_by_current_user ? "currentColor" : "none"
                                                }
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                                strokeWidth={entry.liked_by_current_user ? "0" : "2"}
                                            >
                                                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                            {entry.likes}
                                        </Button>
                                    </div>
                                    <p className="whitespace-pre-wrap break-words text-white">
                                        {entry.message}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}