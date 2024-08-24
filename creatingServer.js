const express = require("express");
const db = require("./db");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const personRoutes = require("./Routes/PersonRoutes");
const MenuItemRoutes = require("./Routes/MenuItemRoutes");
require('dotenv').config();
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.send("Welcome to port 3000");
});

app.get("/smartphones", (req, res) => {
  res.send("<h1>Buy new flagship smartphones</h1>");
});

app.get("/tv", (req, res) => {
  var customTV = {
    brand: "Sony",
    model: "Bravia 4K OLED",
    year: 2024,
  };
  res.send(customTV);
});

app.get("/computer", (req, res) => {
  res.send("<h1>Buy laptops, desktops and accessories</h1>");
});

// Routes
app.use("/person", personRoutes);
app.use("/menuitem", MenuItemRoutes);




app.listen(PORT, () => {
  console.log("Server is running...");
});
