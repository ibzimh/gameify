const express = require("express");
const Chore = require("../model/chore.model.js");
const router = express.Router();

router.route("/").get(async (request, response) => {
  try {
    const chore = await Chore.find();

    return response.status(200).json({
      count: chore.length,
      data: chore,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
router.route("/add").post((req, res) => {
  const { chore_name, description, due_date, assign_to, category, points } =
    req.body;

  const newChore = new Chore({
    chore_name,
    description,
    due_date,
    assign_to,
    category,
    points,
  });

  newChore
    .save()
    .then(() => res.json("Chore added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Delete Chore by ID
router.route("/:id").delete(async (req, res) => {
  try {
    const choreID = req.params.id;
    const deletedChore = await Chore.findByIdAndDelete(choreID);

    if (!deletedChore) {
      return res.status(404).json({ message: "Chore not found" });
    }

    return res.status(200).json({
      message: "Chore deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
