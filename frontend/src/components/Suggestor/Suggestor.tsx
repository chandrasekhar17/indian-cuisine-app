import React, { useState } from "react";
import "./Suggestor.scss";
import axios from "axios";
import DishCard from "../Dishcard/Dishcard";
import { BASE_URL } from "../../services/dishes";

const ALL_INGREDIENTS = [
  "rice flour",
  "coconut",
  "jaggery",
  "banana",
  "ghee",
  "sugar",
  "milk",
  "cardamom",
  "maida",
  "besan",
  "semolina",
];

const Suggestor: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [suggestedDishes, setSuggestedDishes] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  const handleToggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((ing) => ing !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/dishes/by-ingredients`, {
        ingredients: selectedIngredients,
      });
      setSuggestedDishes(res.data);
    } catch (err) {
      console.error("Error fetching suggested dishes", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="suggestor-container">
      <h2>Dish Suggestor</h2>
      <p>Select ingredients you have, and we'll suggest matching dishes!</p>

      <div className="ingredients-list">
        {ALL_INGREDIENTS.map((ingredient) => (
          <label key={ingredient} className="ingredient-option">
            <input
              type="checkbox"
              value={ingredient}
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => handleToggleIngredient(ingredient)}
            />
            {ingredient}
          </label>
        ))}
      </div>

      <button onClick={handleSuggest} disabled={loading || selectedIngredients.length === 0}>
        {loading ? "Finding..." : "Suggest Dishes"}
      </button>

      {suggestedDishes.length > 0 && (
        <div className="suggested-dishes">
          <h3>Possible Dishes</h3>
          <div className="dish-grid">
            {suggestedDishes.map((dish) => (
              <DishCard key={dish.name} {...dish} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestor;
