import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>My Recipe App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
