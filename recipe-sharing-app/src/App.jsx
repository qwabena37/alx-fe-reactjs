// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
import AddRecipeForm from "./components/AddRecipeForm";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-6">
          🍲 Recipe Sharing App
        </h1>

        {/* ✅ Search bar appears on main page */}
        <SearchBar />

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
