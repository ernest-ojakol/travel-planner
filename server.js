require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
});

app.post('/plan-trip', async (req, res) => {
  const { start, destination, dates, interests } = req.body;
  try {
    // Fetch weather for destination
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
    const weatherResponse = await axios.get(weatherUrl);
    const weather = {
      temp: weatherResponse.data.main.temp,
      description: weatherResponse.data.weather[0].description,
    };

    // Pass trip data to results page
    res.render('results', {
      start,
      destination,
      dates,
      interests,
      weather,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    });
  } catch (error) {
    console.error(error);
    res.render('home', {
      error: 'Failed to fetch weather data. Please try again.',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    });
  }
});

app.get('/saved-trips', (req, res) => {
  res.render('saved-trips', { googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));