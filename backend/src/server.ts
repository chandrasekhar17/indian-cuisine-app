import express from "express";
import cors from "cors";
import dishRoutes from "./routes/dishes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/dishes", dishRoutes);

app.get("/", (_req, res) => {
  res.send("Indian Cuisine API is running 🌶️");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
