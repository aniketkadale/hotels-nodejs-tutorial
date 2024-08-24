const express = require("express");
const router = express.Router();
const Person = require("./../Models/Person");

// GET method for fetching person data
router.get("/", async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Data fetched...");
    res.status(200).json({ personData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error while fetching data..." });
  }
});

// POST API METHODS FOR PERSON
router.post("/", async (req, res) => {
  const data = req.body;
  const newPerson = new Person(data);

  try {
    const response = await newPerson.save();
    console.log("Data saved successfully...");
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// Querying params
router.get("/:workType", async (req, res) => {
  const workType = req.params.workType;
  try {
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const data = await Person.find({ work: workType });
      console.log("Work type data fetched...");
      res.status(200).json({ data });
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error..." });
  }
});

// UPDATE document
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const personUpdated = req.body;
    const response = await Person.findByIdAndUpdate(personId, personUpdated, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      res.status(404).json({ error: "person not found" });
    }

    console.log("Data updated successfully...");
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error..." });
  }
});

// DELETE document
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      res.status(404).json({ error: "person not found" });
    }

    console.log("Data deleted successfully...");
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error..." });
  }
});

module.exports = router;
