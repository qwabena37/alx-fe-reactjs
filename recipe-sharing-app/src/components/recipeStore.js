// src/store/recipeStore.js
import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
      filteredRecipes: [...state.recipes, recipe],
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      filteredRecipes: state.filteredRecipes.filter((r) => r.id !== id),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
      filteredRecipes: state.filteredRecipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  // ✅ Search-related actions
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // trigger filtering whenever search term changes
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) => {
        const term = state.searchTerm.toLowerCase();
        return (
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term) ||
          (recipe.ingredients &&
            recipe.ingredients.some((ing) =>
              ing.toLowerCase().includes(term)
            ))
        );
      }),
    })),
}));
