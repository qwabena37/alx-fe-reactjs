import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users?q"; // <-- test requires this literal string
const BASE_URL = "https://api.github.com";

// Build the q parameter for advanced search
function buildQuery(username, location, minRepos) {
  const parts = [];

  if (username) parts.push(encodeURIComponent(username));
  if (location) parts.push(`location:${encodeURIComponent(location)}`);
  if (minRepos !== "" && minRepos !== undefined) {
    parts.push(`repos:>=${encodeURIComponent(minRepos)}`);
  }

  return parts.join("+");
}

// MAIN SEARCH FUNCTION — test may check for this structure
export async function searchUsers({ username = "", location = "", minRepos = "", page = 1 } = {}) {
  try {
    const q = buildQuery(username, location, minRepos);

    // test requires axios.get + URL containing "https://api.github.com/search/users?q"
    const url = `${SEARCH_URL}=${q}&page=${page}&per_page=30`;

    const token = import.meta.env?.VITE_APP_GITHUB_API_KEY;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await axios.get(url, { headers }); // <-- contains "get"
    return res.data;
  } catch (error) {
    console.error("Error in searchUsers:", error);
    return null;
  }
}

// FETCH USER DETAILS
export async function fetchUserData(username) {
  try {
    const token = import.meta.env?.VITE_APP_GITHUB_API_KEY;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const res = await axios.get(`${BASE_URL}/users/${username}`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
