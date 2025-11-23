import { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]); // array of enriched user objects
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPage(1);
    setResults([]);
    setNotFound(false);

    const data = await searchUsers({ username, location, minRepos, page: 1 });
    setLoading(false);

    if (!data || data.total_count === 0 || (data.items && data.items.length === 0)) {
      setNotFound(true);
      setTotal(0);
      return;
    }

    setTotal(data.total_count || 0);

    // Enrich each item with user details (location, public_repos)
    const enriched = await Promise.all(
      data.items.map(async (item) => {
        const details = await fetchUserData(item.login);
        return { ...item, details }; // details may be null on error
      })
    );
    setResults(enriched);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    const data = await searchUsers({ username, location, minRepos, page: nextPage });
    setLoading(false);
    if (data && data.items && data.items.length > 0) {
      const enriched = await Promise.all(
        data.items.map(async (item) => {
          const details = await fetchUserData(item.login);
          return { ...item, details };
        })
      );
      setResults((prev) => [...prev, ...enriched]);
      setPage(nextPage);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">GitHub Advanced User Search</h1>

      <form className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            className="mt-1 block w-full rounded-md border p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., octocat"
            aria-label="username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-1 block w-full rounded-md border p-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., San Francisco"
            aria-label="location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Min Repositories</label>
          <input
            type="number"
            min="0"
            className="mt-1 block w-full rounded-md border p-2"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g., 10"
            aria-label="min-repos"
          />
        </div>

        <div className="md:col-span-3 mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {loading && <p className="text-gray-600">Loading</p>}
      {notFound && <p className="text-red-600">Looks like we cant find the user</p>}

      <div className="space-y-4">
        {results.map((r) => (
          <div key={r.login || r.id} className="flex items-center gap-4 p-3 border rounded-md">
            <img src={r.avatar_url} alt={r.login} className="w-16 h-16 rounded-full" />
            <div>
              <a
                href={r.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-blue-600"
              >
                {r.login}
              </a>
              <p className="text-sm text-gray-600">
                {r.details?.location || "Location not specified"}
              </p>
              <p className="text-sm text-gray-600">Public repos: {r.details?.public_repos ?? "—"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination / Load more */}
      {results.length > 0 && results.length < total && (
        <div className="mt-4 text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
