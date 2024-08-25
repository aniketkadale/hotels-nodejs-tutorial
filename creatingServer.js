require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const passport = require("./auth");

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Define the PORT
const PORT = process.env.PORT || 3000;

// Define Routes with Authentication
app.get("/", (req, res) => {
  res.send("<h1>Welcome to our Hotel</h1>");
});

app.get("/smartphones", (req, res) => {
  res.send("<h1>Buy new flagship smartphones</h1>");
});

app.get("/tv", (req, res) => {
  const customTV = {
    brand: "Sony",
    model: "Bravia 4K OLED",
    year: 2024,
  };
  res.send(customTV);
});

app.get("/computer", (req, res) => {
  res.send("<h1>Buy laptops, desktops and accessories</h1>");
});

// Auth middleware
const localAuthMiddleware = passport.authenticate("local", { session: false });

// Use the routes
const personRoutes = require("./Routes/PersonRoutes");
const menuItemRoutes = require("./Routes/MenuItemRoutes");
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menuitem", menuItemRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
