import { Request, Response } from "express";
import csv from "csvtojson";
import path from "path";

// Define and load dishes from CSV
let dishes: any[] = [];
const csvFilePath = path.join(__dirname, "../data/indian_food.csv");


csv()
  .fromFile(csvFilePath)
  .then((json: any[]) => {
    dishes = json;
    console.log(`Loaded ${dishes.length} dishes from CSV`);
  })
  .catch((err: any) => {
    console.error("Failed to load dishes from CSV:", err);
  });


export const getAllDishes = (_req: Request, res: Response) => {
  res.json(dishes);
};


export const getDishByName = (req: Request, res: Response) => {
  const name = req.params.name.toLowerCase();
  const dish = dishes.find(
    (d: { name: string }) => d.name.toLowerCase() === name
  );

  if (!dish) {
    return res.status(404).json({ message: "Dish not found" });
  }

  res.json(dish);
};

export const getDishesByIngredients = (req: Request, res: Response) => {
  const { ingredients } = req.body;

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({ message: "Ingredients should be an array" });
  }

  const matchedDishes = dishes.filter((dish: { ingredients: string }) => {
    const dishIngredients = dish.ingredients
      .toLowerCase()
      .split(",")
      .map((i) => i.trim());

    return ingredients.every((inputIng: string) =>
      dishIngredients.includes(inputIng.toLowerCase())
    );
  });

  res.json(matchedDishes);
};


export const searchDishes = (req: Request, res: Response) => {
  const query = req.query.q?.toString().toLowerCase() || "";

  const results = dishes.filter((dish) => {
    return (
      dish.name.toLowerCase().includes(query) ||
      dish.ingredients.toLowerCase().includes(query) ||
      dish.state.toLowerCase().includes(query) ||
      dish.region.toLowerCase().includes(query)
    );
  });

  res.json(results.slice(0, 10)); 
};
