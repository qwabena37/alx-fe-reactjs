// src/components/FavoriteButton.jsx
import React from "react";
import { useRecipeStore } from "../store/recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const { favorites, toggleFavorite } = useRecipeStore((state) => ({
    favorites: state.favorites,
    toggleFavorite: state.toggleFavorite,
  }));

  const isFavorite = favorites.includes(recipeId);

  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      className={`px-3 py-1 rounded-lg ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
    </button>
  );
};

export default FavoriteButton;
