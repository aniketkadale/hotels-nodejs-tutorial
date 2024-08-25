const express = require("express");
const router = express.Router();
const MenuItem = require("./../Models/MenuItem");

// API Methods for Menu Items
router.get("/", async (req, res) => {
  try {
    const menuData = await MenuItem.find();
    console.log("Menu items fetched...");
    res.status(200).json({ menuData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error while fetching menuitems..." });
  }
});

// GET API to get items based on taste
router.get("/:tasteType", async (req, res) => {
  const tasteType = req.params.tasteType;
  try {
    if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("Menu based on taste fetched...");
      res.status(200).json({ response });
    } else {
      res.status(404).json({ error: "Invalid taste type..." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        error: "Internal server error while fetching taste based menuitems...",
      });
  }
});

// POST API to put menu items
router.post("/", async (req, res) => {
  const menuData = req.body;
  const newData = new MenuItem(menuData);

  try {
    const response = await newData.save();
    console.log("Menu items saved successfully...");
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error while saving menuitems..." });
  }
});

module.exports = router;
