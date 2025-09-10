require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Initialize Express App
const app = express();

// Define the PORT
const PORT = process.env.PORT || 3000;

// Apply middleware

// allow cross origin resource sharing
app.use(cors());

// define our end-points
app.get("/api/popular-movies", async (req, res) => {
  try {
    // send request to the TMDB server
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );

    // send data back to frontend
    res.json(response.data);
  } catch (error) {
    // log error
    console.error("Error fetching popular movies:", error.message);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

app.get("/api/movie/:id", async (req, res) => {
  const movieId = req.params.id;

  if (!movieId) {
    return res.status(400).json({ message: "Movie Id is required." });
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

app.get("/api/search/movie", async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    res.status(500).json({ message: "Error fetching data from TMDb" });
  }
});

// start the server
app.listen(PORT, () => {
  console.log(`BFF Server is running on http://localhost:${PORT}`);
});
