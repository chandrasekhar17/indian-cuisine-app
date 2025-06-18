import React from "react";
import { useNavigate } from "react-router-dom";
import "./DishCard.scss";

interface DishProps {
  name: string;
  diet: string;
  prep_time: string;
  cook_time: string;
  region: string;
  state: string;
}

const DishCard: React.FC<DishProps> = ({
  name,
  diet,
  prep_time,
  cook_time,
  region,
  state,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dish/${encodeURIComponent(name)}`);
  };

  return (
    <div className="dish-card" onClick={handleClick} role="button" tabIndex={0}>
      <h3>{name}</h3>

      <div className="dish-meta">
        <p><strong>Diet:</strong> {diet}</p>
        <p><strong>Prep:</strong> {prep_time} mins</p>
        <p><strong>Cook:</strong> {cook_time} mins</p>
      </div>

      <div className="dish-tags">
        <span className="tag region">{region}</span>
        <span className="tag state">{state}</span>
      </div>
    </div>
  );
};

export default DishCard;
