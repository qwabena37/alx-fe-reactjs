import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data.json';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipeId = Number(id);

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.find((r) => r.id === recipeId);
    setRecipe(found);
  }, [recipeId]);

  if (!recipe) {
    return <p className="text-center mt-10 text-lg">Recipe not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      <h1 className="text-3xl font-bold mt-6">{recipe.title}</h1>

      <p className="text-gray-600 mt-2">{recipe.summary}</p>

      {/* INGREDIENTS SECTION */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* instructions*/}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-3">Cooking Instructions</h2>

        <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
          {recipe.steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
