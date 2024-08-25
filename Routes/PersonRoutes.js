const express = require("express");
const router = express.Router();
const Person = require("./../Models/Person");

// GET method for fetching person data
router.get("/", async (req, res) => {
  try {
    const personData = await Person.find();
    console.log("Person fetched...");
    res.status(200).json({ personData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error while fetching person data..." });
  }
});

// POST API METHODS FOR PERSON
router.post("/", async (req, res) => {
  const data = req.body;
  const newPerson = new Person(data);

  try {
    const response = await newPerson.save();
    console.log("Person saved successfully...");
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Intern error while registering a person..." });
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
    res.status(500).json({ error: "Internal Error whilte finding work type person..." });
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

    console.log("Person updated successfully...");
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error while updating person..." });
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

    console.log("Person deleted successfully...");
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error while deleting a person..." });
  }
});

module.exports = router;
