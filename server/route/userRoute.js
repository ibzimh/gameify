const express = require('express');
const User = require('../model/user.model.js');
const router = express.Router();

//get all user
router.route('/').get( async (request, response) => {
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
  // Get users by teamId
router.route('/team/:teamId').get(async (request, response) => {
  try {
    const teamId = request.params.teamId;

    const users = await User.find({ teamId });

    if (!users || users.length === 0) {
      return response.status(404).json({ message: 'No users found for this teamId' });
    }

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
  // get user by email
  router.route('/email/:email').get(async (request, response) => {
    try {
      const userEmail = request.params.email;
  
      const user = await User.findOne({ email: userEmail });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).json({
        data: user,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  });
  
 // get user by id
 router.route('/:id').get(async (request, response) => {
    try {
      const userId = request.params.id;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
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
  router.route('/add').post((req, res) => {
    const { user_name,teamIds, email, dob, gender } = req.body;
  
    const newUser = new User({
      user_name,
      teamIds,
      email,
      dob,
      gender
    });
  
    newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  //delete user by id
  router.route('/:id').delete(async (request, response) => {
    try {
      const userId = request.params.id;
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).json({
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  //update user by id
  router.route('/:id').put(async (request, response) => {
    try {
      const userId = request.params.id;
      const updatedUserData = request.body;
  
      const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
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

