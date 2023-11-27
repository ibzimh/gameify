const express = require("express");
const User = require("../model/user.model.js");
const router = express.Router();

// get all user
router.route("/").get(async (request, response) => {
  try {
    const user = await User.find();

    return response.status(200).json({
      count: user.length,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get user by id
router.route("/:id").get(async (request, response) => {
  try {
    const userId = request.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Add user
router.route("/add").post((req, res) => {
  const { user_name, role, email, dob, gender, total_point, achievement, status } = req.body;

  const newUser = new User({ user_name, role, email, dob, gender, total_point, achievement, status });

  newUser.save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete user by id
router.route("/:id").delete(async (request, response) => {
  try {
    const userId = request.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// update user by id
router.route("/:id").put(async (request, response) => {
  try {
    const userId = request.params.id;
    const updatedUserData = request.body;

    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }

    return response.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

module.exports = router;
