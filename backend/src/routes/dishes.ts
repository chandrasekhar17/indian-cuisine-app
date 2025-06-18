import express, { Router, Request, Response } from "express";
import csv from "csvtojson";
import path from "path";

const router: Router = Router();

const csvFilePath = path.join(__dirname, "../data/indian_food.csv");

let dishes: any[] = [];

csv()
  .fromFile(csvFilePath)
  .then(
    (json: any[]) => {
      dishes = json;
      console.log(`Loaded ${dishes.length} dishes from CSV`);
    },
    (err: any) => {
      console.error("Error loading CSV:", err);
    }
  );

// All dishes
router.get("/", (_req: Request, res: Response) => {
  res.json(dishes);
});
// Search dishes by query
router.get("/search", (req, res): any => {
  const query = req.query.q?.toString().toLowerCase();

  if (!query || query.length < 2) {
    return res.status(400).json({ error: "Query is too short or missing" });
  }

  const results = dishes.filter((dish) => {
    return (
      dish.name.toLowerCase().includes(query) ||
      dish.ingredients.toLowerCase().includes(query) ||
      dish.state.toLowerCase().includes(query) ||
      dish.region.toLowerCase().includes(query)
    );
  });

  res.json(results.slice(0, 10));
});

// Get dish by name
router.get("/:name", (req, res): any => {
  const { name } = req.params;
  const dish = dishes.find((d) => d.name.toLowerCase() === name.toLowerCase());

  if (!dish) {
    return res.status(404).json({ error: "Dish not found" });
  }

  res.json(dish);
});

//Get dishes by matching ingredients
router.post("/by-ingredients", (req, res): any => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients)) {
    return res
      .status(400)
      .json({ error: "Please provide an array of ingredients" });
  }

  const matchedDishes = dishes.filter((dish) => {
    const dishIngredients = dish.ingredients
      .toLowerCase()
      .split(",")
      .map((i: string) => i.trim());

    return ingredients.every((inputIng: string) =>
      dishIngredients.includes(inputIng.toLowerCase())
    );
  });

  res.json(matchedDishes);
});

export default router;
