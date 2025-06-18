# Indian Cuisine Explorer 

Explore a wide variety of Indian dishes by searching through ingredients, names, regions, or states. This full-stack application uses a Node.js backend and a Vite + React frontend.

---

## Tech Stack

### Frontend:
- Vite (React + TypeScript)
- React Router DOM for routing
- SCSS Modules for styling
- Axios and Fetch for API calls
- Clean, modular component architecture

### Backend:
- Node.js + Express + TypeScript
- `csvtojson` for CSV data loading
- RESTful API endpoints
- CORS enabled

---

## Features

### Backend Features (`/backend`)

- **CSV Loader**: Loads all dishes from `indian_food.csv` on startup for fast in-memory access.
- **GET `/api/dishes`**: Returns a list of all dishes as JSON.
- **GET `/api/dishes/:name`**: Returns a single dish by its name (case-insensitive).
- **POST `/api/dishes/by-ingredients`**: Returns dishes that match all provided ingredients. Expects a JSON body: `{ "ingredients": ["ingredient1", "ingredient2", ...] }`.
- **GET `/api/dishes/search?q=term`**: Searches dishes by name, ingredients, region, or state. Returns up to 10 best matches.
- **Error Handling**: Returns appropriate HTTP status codes and error messages for invalid requests or missing dishes.

### Frontend Features (`/frontend`)

- **Home Page**: Displays all Indian dishes in a responsive grid of cards, each showing name, diet, prep/cook time, region, and state.
- **Dish Details Page**: Click a dish card to view full details, including all attributes and ingredients.
- **Search Bar**:
  - Live search as you type (after 2 characters).
  - Suggests dishes by name, ingredient, region, or state.
  - Clicking a suggestion navigates to the dish details page.
  - Clear (cancel) icon resets the search and results.
- **Suggestor Page**:
  - Select ingredients you have from a list.
  - Click "Suggest Dishes" to see all dishes you can make with those ingredients.
  - Results are shown in the same card format.
- **Navigation**: Header with app title and link to the Suggestor page.
- **Responsive Design**: Works well on desktop and mobile, with modern SCSS styling.
- **Error & Loading States**: User-friendly messages for loading and errors.
- **Component Structure**: Modular React components for easy maintenance and extension.

---

##  Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/chandrasekhar17/indian-cuisine-app.git
cd indian-cuisine-app
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```
- Runs on: [http://localhost:3000](http://localhost:3000)
- CSV Source: `backend/src/data/indian_food.csv`
- API Endpoints:
  - `GET /api/dishes`
  - `GET /api/dishes/:name`
  - `POST /api/dishes/by-ingredients`
  - `GET /api/dishes/search?q=term`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```
- Runs on: [http://localhost:5174](http://localhost:5174) (or next available port)
- Make sure the backend is running for API calls to work.

---

## Usage Guide

- **Browse All Dishes**: Visit the home page to see all dishes.
- **Search**: Use the search bar to find dishes by name, ingredient, region, or state.
- **Dish Details**: Click any dish card to view its full details.
- **Suggestor**: Click the "Want Suggestions On Something?" link in the header, select your available ingredients, and get dish suggestions.
- **Responsive**: The app works on both desktop and mobile browsers.

---

##  Development

- **Frontend**: All React code is in `frontend/src/`. Main entry: `main.tsx`, routes in `App.tsx`, pages in `pages/`, components in `components/`.
- **Backend**: All Express code is in `backend/src/`. Main entry: `server.ts`, routes in `routes/dishes.ts`, controllers in `controllers/dishesController.ts`.

---