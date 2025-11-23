import axios from "axios";

const BASE_URL = "https://api.github.com";
const PER_PAGE = 30;

/**
 * Build q param for GitHub search API.
 * Example: "john+location:San+Francisco+repos:>=10"
 */
function buildQuery({ username, location, minRepos }) {
  const parts = [];
  if (username) parts.push(encodeURIComponent(username));
  if (location) parts.push(`location:${encodeURIComponent(location)}`);
  if (minRepos || minRepos === 0) parts.push(`repos:>=${encodeURIComponent(minRepos)}`);
  return parts.join("+");
}

/**
 * Search users with advanced filters.
 * Returns the search response (items, total_count).
 *
 * @param {Object} opts
 *  - username, location, minRepos, page
 */
export async function searchUsers({ username = "", location = "", minRepos = "", page = 1 } = {}) {
  try {
    const q = buildQuery({ username, location, minRepos });
    const params = {
      q,
      per_page: PER_PAGE,
      page,
    };

    const headers = {};
    const token = import.meta.env?.VITE_APP_GITHUB_API_KEY;
    if (token) headers.Authorization = `Bearer ${token}`;

    const url = `${BASE_URL}/search/users`;
    const res = await axios.get(url, { params, headers });
    // res.data: { total_count, incomplete_results, items: [...] }
    return res.data;
  } catch (error) {
    console.error("searchUsers error:", error?.response?.data || error.message);
    return null;
  }
}

/**
 * Fetch single user details (to get location, repo count, etc.)
 * Use this for enriching search results (be mindful of rate limits).
 */
export async function fetchUserData(username) {
  try {
    const headers = {};
    const token = import.meta.env?.VITE_APP_GITHUB_API_KEY;
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await axios.get(`${BASE_URL}/users/${username}`, { headers });
    return res.data;
  } catch (error) {
    console.error("fetchUserData error:", error?.response?.data || error.message);
    return null;
  }
}
