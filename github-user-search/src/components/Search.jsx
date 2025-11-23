import { useState } from "react";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // includes preventDefault
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>   {/* form */}
      <input
        type="text"
        value={query}
        placeholder="Search GitHub users"
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">Search</button>  {/* button */}
    </form>
  );
}

export default Search;
