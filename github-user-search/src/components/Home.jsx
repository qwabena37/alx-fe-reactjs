import Search from "./components/Search";

function Home() {
  const handleSearch = (query) => {
    console.log("User searched for:", query);
    // call API here...
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
    </div>
  );
}
