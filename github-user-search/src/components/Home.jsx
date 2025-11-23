import Search from "./Search";

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

export default Home;