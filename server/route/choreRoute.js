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
// Delete chore by ID
router.route('/:id').delete(async (req, res) => {
  try {
    const choreId = req.params.id;
    const deleteChore = await Chore.findByIdAndDelete(choreId);

    if (!deleteChore) {
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
