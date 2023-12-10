//Viet
const express = require('express');
const Reward = require('../model/reward.model.js');
const router = express.Router();



// Get All Rewards
router.route('/').get(async (req, res) => {
  try {
    const rewards = await Reward.find();

    return res.status(200).json({
      count: rewards.length,
      data: rewards,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
// Get Reward by ID
router.route('/:id').get(async (req, res) => {
    try {
      const rewardId = req.params.id;
  
      const reward = await Reward.findById(rewardId);
  
      if (!reward) {
        return res.status(404).json({ message: 'Reward not found' });
      }
  
      return res.status(200).json({
        data: reward,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Server Error' });
    }
  });
  // Create a New Reward
router.route('/').post(async (req, res) => {
    try {
      const { reward_name, description, value } = req.body;
  
      const newReward = new Reward({
        reward_name,
        description,
        value,
      });
  
      await newReward.save();
  
      return res.status(201).json({
        data: newReward,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  // Update Reward by ID
router.route('/:id').put(async (req, res) => {
    try {
      const rewardId = req.params.id;
      const updatedData = req.body;
  
      const updatedReward = await Reward.findByIdAndUpdate(rewardId, updatedData, { new: true });
  
      if (!updatedReward) {
        return res.status(404).json({ message: 'Reward not found' });
      }
  
      return res.status(200).json({
        data: updatedReward,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  // Delete Reward by ID
    router.route('/:id').delete(async (req, res) => {
    try {
      const rewardId = req.params.id;
  
      const deletedReward = await Reward.findByIdAndDelete(rewardId);
  
      if (!deletedReward) {
        return res.status(404).json({ message: 'Reward not found' });
      }
  
      return res.status(200).json({
        message: 'Reward deleted successfully',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });




module.exports = router;
