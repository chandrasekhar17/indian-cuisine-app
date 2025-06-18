/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

type Props = {
  onSearchResults: (results: any[]) => void;
};

const Header: React.FC<Props> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetch(`http://localhost:3000/api/dishes/search?q=${query}`)
          .then((res) => res.json())
          .then(onSearchResults)
          .catch(() => onSearchResults([]));
      } else {
        onSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    onSearchResults([]);
  };

  return (
    <header className="header">
      <h1>Indian Cuisine Explorer</h1>
      <Link to="/suggestor">Want Suggestions On Something ?</Link>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for dishes, ingredients, or regions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
