import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {/* Add navigation links as needed */}
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <AddRecipeForm />
            <RecipeList />
          </>
        } />

        {/* Route with dynamic param for recipe details */}
        <Route 
          path="/recipe/:id" 
          element={<RecipeDetailsWrapper />} 
        />
      </Routes>
    </Router>
  );
}

// Helper component to extract id param and pass as prop
import { useParams } from 'react-router-dom';

const RecipeDetailsWrapper = () => {
  const { id } = useParams();
  const recipeId = Number(id); // assuming ids are numbers
  return <RecipeDetails recipeId={recipeId} />;
};

export default App;
