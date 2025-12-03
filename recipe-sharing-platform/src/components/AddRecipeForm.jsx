import React, { useState } from "react";

export default function AddRecipeForm() {
  const [values, setValues] = useState({
    title: "",
    ingredients: "",
    steps: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // -------------------------------------------
  // VALIDATION FUNCTION REQUIRED BY YOUR PROJECT
  // -------------------------------------------
  const validate = (vals) => {
    const validationErrors = {};

    if (!vals.title.trim()) {
      validationErrors.title = "Recipe title is required.";
    }

    if (!vals.ingredients.trim()) {
      validationErrors.ingredients = "Ingredients are required.";
    } else if (vals.ingredients.split("\n").length < 2) {
      validationErrors.ingredients =
        "Please list at least two ingredients (one per line).";
    }

    if (!vals.steps.trim()) {
      validationErrors.steps = "Preparation steps are required.";
    } else if (vals.steps.split("\n").length < 2) {
      validationErrors.steps =
        "Please include at least two steps (one per line).";
    }

    return validationErrors;
  };

  // -------------------------------------------
  // SUBMIT HANDLER
  // -------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const newRecipe = {
      id: Date.now(),
      title: values.title.trim(),
      ingredients: values.ingredients.split("\n").map((i) => i.trim()),
      steps: values.steps.split("\n").map((s) => s.trim())
    };

    console.log("New Recipe:", newRecipe);
    setSubmitted(true);

    // RESET FORM
    setValues({
      title: "",
      ingredients: "",
      steps: ""
    });

    setTimeout(() => setSubmitted(false), 3000);
  };

  // -------------------------------------------
  // COMPONENT JSX
  // -------------------------------------------
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 shadow-lg rounded-xl mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Add a New Recipe</h1>

      {submitted && (
        <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-md">
          🎉 Recipe submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* TITLE */}
        <label className="block font-semibold mb-1">Recipe Title</label>
        <input
          type="text"
          value={values.title}
          onChange={(e) =>
            setValues({ ...values, title: e.target.value })
          }
          placeholder="Enter recipe title"
          className={`w-full border ${
            errors.title ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}

        {/* INGREDIENTS */}
        <label className="block font-semibold mt-6 mb-1">
          Ingredients (one per line)
        </label>
        <textarea
          value={values.ingredients}
          onChange={(e) =>
            setValues({ ...values, ingredients: e.target.value })
          }
          placeholder="e.g.:&#10;2 tomatoes&#10;1 cup flour"
          className={`w-full h-32 border ${
            errors.ingredients ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
        ></textarea>
        {errors.ingredients && (
          <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
        )}

        {/* STEPS */}
        <label className="block font-semibold mt-6 mb-1">
          Preparation Steps (one per line)
        </label>
        <textarea
          value={values.steps}
          onChange={(e) =>
            setValues({ ...values, steps: e.target.value })
          }
          placeholder="e.g.:&#10;Mix ingredients&#10;Bake for 20 minutes"
          className={`w-full h-36 border ${
            errors.steps ? "border-red-500" : "border-gray-300"
          } rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
        ></textarea>
        {errors.steps && (
          <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
        )}

        {/* SUBMIT BUTTON */}
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
