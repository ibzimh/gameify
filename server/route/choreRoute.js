const express = require('express');
const Chore = require('../model/chore.model.js');
const router = express.Router();

router.route('/').get( async (request, response) => {
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
  router.route('/add').post((req, res) => {
    const { chore_name, description, due_date, assign_to, category, points,teamId } = req.body;
  
    const newChore = new Chore({
      chore_name,
      description,
      due_date,
      assign_to,
      category,
      points,
      teamId
    });
  
    newChore.save()
      .then(() => res.json('Chore added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;
