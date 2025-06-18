import { Routes, Route } from "react-router-dom";
import "./App.css";
import DishesListPage from "./pages/DishesList/DishesList";
import DishDetailsPage from "./pages/DishesDetails/DishesDetails";
import SuggestorPage from "./pages/SuggestorPage/SuggestorPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DishesListPage />} />
        <Route path="/dish/:name" element={<DishDetailsPage />} />
        <Route path="/suggestor" element={<SuggestorPage />} />
      </Routes>
    </>
  );
}

export default App;
