// src/components/HomePage.jsx
import React, { useEffect, useState } from 'react';
import data from '../data.json'; // bundler imports static json from src
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Since data.json is in src we can import it directly. If you move it to public, use fetch('/data.json').
    setRecipes(data);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Recipes</h1>
        <p className="text-gray-600 mt-1">Explore delicious recipes — responsive and mobile-friendly.</p>
      </header>

      <section
        aria-label="Recipe list"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {recipes.map((r) => (
          <article
            key={r.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            {/* Image container */}
            <div className="h-44 sm:h-48 md:h-56 w-full overflow-hidden">
              <img
                src={r.image}
                alt={r.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{r.title}</h2>
              <p className="text-gray-600 mt-2 text-sm">{r.summary}</p>

              {/* action row (optional) */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-500">Prep · 15m</span>
                <button
                  className="text-sm px-3 py-1 rounded-full border border-transparent hover:bg-gray-100 transition"
                  aria-label={`View ${r.title}`}
                >
                  View
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
