const express = require('express');
const Authentication = require('../model/authentication.model.js');
const router = express.Router();

//get all authentication 
router.route('/').get(async (req, res) => {
  try {
    const authentications = await Authentication.find();

    return res.status(200).json({
      count: authentications.length,
      data: authentications,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Create a New Authentication
router.route('/').post(async (req, res) => {
  try {
    const { user_id, auth_provider, access_token } = req.body;

    const newAuthentication = new Authentication({
      user_id,
      auth_provider,
      access_token,
    });

    await newAuthentication.save();

    return res.status(201).json({
      data: newAuthentication,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// get authentication by id
router.route('/:id').get(async (req, res) => {
  try {
    const authenticationId = req.params.id;

    const authentication = await Authentication.findById(authenticationId);

    if (!authentication) {
      return res.status(404).json({ message: 'Authentication record not found' });
    }

    return res.status(200).json({
      data: authentication,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// update authentication by id
  router.route('/:id').put(async (req, res) => {
  try {
    const authenticationId = req.params.id;
    const updatedData = req.body;

    const updatedAuthentication = await Authentication.findByIdAndUpdate(authenticationId, updatedData, { new: true });

    if (!updatedAuthentication) {
      return res.status(404).json({ message: 'Authentication record not found' });
    }

    return res.status(200).json({
      data: updatedAuthentication,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// delete authentication by id
router.route('/:id').delete(async (req, res) => {
    try {
      const authenticationId = req.params.id;
  
      const deletedAuthentication = await Authentication.findByIdAndDelete(authenticationId);
  
      if (!deletedAuthentication) {
        return res.status(404).json({ message: 'Authentication record not found' });
      }
  
      return res.status(200).json({
        message: 'Authentication record deleted successfully',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  
  module.exports = router;


