"use client";
import { useState, useEffect, useContext } from "react";
import { OverlayContext } from "@/app/components/ul/OverlayContext";
import { motion } from "framer-motion";
import { FaStar, FaCodeBranch, FaFile, FaCalendarAlt, FaUpload, FaGithub, FaFilter } from "react-icons/fa";
import { BiSort } from "react-icons/bi";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  updated_at: string;
  created_at: string;
  html_url: string;
}

export default function ProjectsOverlayComponent() {
  const overlayFinished = useContext(OverlayContext);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"newest" | "stars" | "forks">("newest");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const reposPerPage = 6;

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.github.com/users/himangmyid/repos", {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch repositories");
      }
      
      const data: Repo[] = await response.json();
      setRepos(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  // Extract unique languages from repos
  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))] as string[];

  // Sort and filter repos
  const getSortedAndFilteredRepos = () => {
    let filteredRepos = [...repos];
    
    // Apply language filter
    if (filterLanguage !== "all") {
      filteredRepos = filteredRepos.filter(repo => repo.language === filterLanguage);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "newest":
        return filteredRepos.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case "stars":
        return filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      case "forks":
        return filteredRepos.sort((a, b) => b.forks_count - a.forks_count);
      default:
        return filteredRepos;
    }
  };

  const sortedAndFilteredRepos = getSortedAndFilteredRepos();
  
  // Pagination
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = sortedAndFilteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(sortedAndFilteredRepos.length / reposPerPage);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  // Format file size
  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Language badge background colors
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-800 text-blue-200",
      JavaScript: "bg-yellow-700 text-yellow-100",
      HTML: "bg-red-800 text-red-200",
      CSS: "bg-purple-800 text-purple-200",
      Python: "bg-green-800 text-green-200",
      Java: "bg-orange-800 text-orange-200",
      default: "bg-gray-800 text-gray-200",
    };
    return colors[language] || colors.default;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {overlayFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full text-gray-200"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">GitHub Repositories</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-lg"
            >
              <FaFilter /> Filters
            </motion.button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg mb-6 shadow-lg border border-gray-700"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-400">Sort by:</label>
                  <div className="flex items-center gap-2 bg-gray-900 rounded-md p-1 border border-gray-700">
                    <BiSort className="text-blue-400 ml-2" />
                   
<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value as "newest" | "stars" | "forks")}
  className="bg-gray-900 text-white rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="newest">Newest</option>
  <option value="stars">Most Stars</option>
  <option value="forks">Most Forks</option>
</select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-400">Filter by language:</label>
                  <select
                    value={filterLanguage}
                    onChange={(e) => setFilterLanguage(e.target.value)}
                    className="bg-gray-900 text-white rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Languages</option>
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRepos.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all shadow-lg"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">{repo.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">
                    {repo.description || "No description"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {repo.language && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getLanguageColor(repo.language)}`}>
                        {repo.language}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span className="text-yellow-200">{repo.stargazers_count} Stars</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCodeBranch className="text-green-500" />
                      <span className="text-green-200">{repo.forks_count} Forks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFile className="text-blue-500" />
                      <span className="text-blue-200">{formatFileSize(repo.size * 1024)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-purple-500" />
                      <span className="text-purple-200">{formatDate(repo.updated_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUpload className="text-orange-500" />
                      <span className="text-orange-200">{formatDate(repo.created_at)}</span>
                    </div>
                  </div>
                </div>
                
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.8)" }}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 transition-colors w-full"
                >
                  <FaGithub /> View on GitHub
                </motion.a>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-4">
              {currentPage > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 border border-gray-700 shadow-lg"
                >
                  Previous
                </motion.button>
              )}
              {currentPage < totalPages && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-lg"
                >
                  Show More
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}