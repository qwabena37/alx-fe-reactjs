const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export async function searchUsers(username) {
  const response = await fetch(
    `https://api.github.com/search/users?q=${username}`,
    {
      headers: {
        Authorization: API_KEY ? `Bearer ${API_KEY}` : "",
      },
    }
  );
  return response.json();
}
