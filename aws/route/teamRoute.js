const express = require('express');
const Team = require('../model/team.model.js');
const router = express.Router();

// Get All Teams
router.route('/').get(async (req, res) => {
  try {
    const teams = await Team.find();
    return res.status(200).json({
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Get Team by ID
router.route('/:id').get(async (req, res) => {
  try {
    const teamId = req.params.id;
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.status(200).json({
      data: team,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Create a new team 
router.route('/add').post(async (req, res) => {
  try {
    const { team_name, usersList } = req.body;


    const newTeam = new Team({
      team_name,
      usersList, // Set usersList to an array of ObjectIds referencing users
    });

    await newTeam.save();

    return res.status(201).json({
      message: 'Team created successfully',
      data: newTeam,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update Team by ID
router.route('/:id').put(async (req, res) => {
  try {
    const teamId = req.params.id;
    const { usersList, ...updatedData } = req.body;

    // Update the team including usersList
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { ...updatedData, usersList }, // Merge updatedData and usersList
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.status(200).json({
      data: updatedTeam,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});



// Delete Team by ID
router.route('/:id').delete(async (req, res) => {
  try {
    const teamId = req.params.id;
    const deletedTeam = await Team.findByIdAndDelete(teamId);

    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.status(200).json({
      message: 'Team deleted successfully',
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
