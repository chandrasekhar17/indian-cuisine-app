import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DishesDetails.scss";
import { BASE_URL } from "../../services/dishes";

interface Dish {
  name: string;
  ingredients: string;
  diet: string;
  prep_time: string;
  cook_time: string;
  flavor_profile: string;
  course: string;
  state: string;
  region: string;
}

const DishDetailsPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [dish, setDish] = useState<Dish | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/dishes/${name}`);
        setDish(response.data);
      } catch (error) {
        setError(`Dish not found ${error}`);
      }
    };

    fetchDish();
  }, [name]);

  if (error) {
    return <div className="dish-details">⚠️ {error}</div>;
  }

  if (!dish) {
    return <div className="dish-details">Loading...</div>;
  }

  return (
    <div className="dish-details">
      <h1>{dish.name}</h1>

      <ul>
        <li><strong>Ingredients:</strong> {dish.ingredients}</li>
        <li><strong>Diet:</strong> {dish.diet}</li>
        <li><strong>Prep Time:</strong> {dish.prep_time} mins</li>
        <li><strong>Cook Time:</strong> {dish.cook_time} mins</li>
        <li><strong>Flavor:</strong> {dish.flavor_profile}</li>
        <li><strong>Course:</strong> {dish.course}</li>
        <li><strong>State:</strong> {dish.state}</li>
        <li><strong>Region:</strong> {dish.region}</li>
      </ul>
    </div>
  );
};

export default DishDetailsPage;
