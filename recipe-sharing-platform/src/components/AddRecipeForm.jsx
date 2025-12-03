import React, { useState } from "react";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // VALIDATION -----------------------
    if (!title.trim()) {
      newErrors.title = "Recipe title is required.";
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split("\n").length < 2) {
      newErrors.ingredients =
        "Please include at least two ingredients (use new lines).";
    }

    if (!steps.trim()) {
      newErrors.steps = "Preparation steps are required.";
    } else if (steps.split("\n").length < 2) {
      newErrors.steps =
        "Please include at least two preparation steps (use new lines).";
    }

    setErrors(newErrors);

    // STOP if errors exist
    if (Object.keys(newErrors).length > 0) return;

    // PREPARE NEW RECIPE OBJECT ---------
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      ingredients: ingredients.split("\n").map((i) => i.trim()),
      steps: steps.split("\n").map((s) => s.trim()),
    };

    console.log("New recipe submitted:", newRecipe);

    setSubmitted(true);

    // RESET FORM FIELDS ------------------
    setTitle("");
    setIngredients("");
    setSteps("");

    // Remove success message after delay
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 shadow-lg rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Add a New Recipe
      </h1>

      {submitted && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md">
          🎉 Recipe submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* TITLE ---------------------------- */}
        <label className="block font-semibold mb-1">Recipe Title</label>
        <input
          type="text"
          className={`w-full border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}

        {/* INGREDIENTS ---------------------- */}
        <label className="block font-semibold mt-6 mb-1">
          Ingredients (one per line)
        </label>
        <textarea
          className={`w-full h-32 border ${
            errors.ingredients ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g.:&#10;2 tomatoes&#10;1 cup flour"
        ></textarea>
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}

        {/* STEPS ---------------------------- */}
        <label className="block font-semibold mt-6 mb-1">
          Preparation Steps (one per line)
        </label>
        <textarea
          className={`w-full h-36 border ${
            errors.steps ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="e.g.:&#10;Mix ingredients&#10;Bake for 20 minutes"
        ></textarea>
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}

        {/* SUBMIT BUTTON -------------------- */}
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 active:scale-95 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
