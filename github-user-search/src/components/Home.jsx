import { useState } from "react";
import SearchBar from "./SearchBar";
import { searchUsers } from "../services/githubService";

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch() {
    const data = await searchUsers(query);
    setResults(data.items || []);
  }

  return (
    <div>
      <h1>GitHub User Search</h1>
      <SearchBar value={query} onChange={setQuery} />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
