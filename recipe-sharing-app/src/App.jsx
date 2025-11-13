import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1>🍲 Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
