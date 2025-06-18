/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from "react";
import DishCard from "../../components/Dishcard/Dishcard";
import Header from "../../components/Header/Header";
import "./DishesList.scss";

const DishesListPage: React.FC = () => {
  const [allDishes, setAllDishes] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/dishes")
      .then((res) => res.json())
      .then(setAllDishes)
      .catch(console.error);
  }, []);

  const showSearchResults = searchResults.length > 0;
  const dishesToShow = showSearchResults ? searchResults : allDishes;

  return (
    <div className="dishes-list-page">
      <Header onSearchResults={setSearchResults} />

      <div className="content">
        {!showSearchResults && <h2>All Indian Dishes</h2>}

        <div className="dish-grid">
          {dishesToShow.map((dish, idx) => (
            <DishCard key={idx} {...dish} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishesListPage;
