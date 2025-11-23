import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setUser(null);

    const data = await fetchUserData(query);

    setLoading(false);

    if (!data) {
      setNotFound(true);
    } else {
      setUser(data);
    }
  };

  return (
    <div>
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder="Search GitHub users"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading</p>}

      {/* Not Found State (test requires this message) */}
      {notFound && <p>Looks like we cant find the user</p>}

      {/* Display User Data */}
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width="120" />
          <h2>{user.login}</h2>
        </div>
      )}
    </div>
  );
}

export default Search;
