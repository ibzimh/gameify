const express = require("express");
const choreController = require("../controller/chore.controller.js");
const Chore = require("../model/chore.model.js");
const router = express.Router();

router.get('/', async (request, response) => {
    try {
      const chores = await Chore.find({});
  
      return response.status(200).json({
        count: chores.length,

        data: chores,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
      
    }
  });
  router.route('/').post(choreController.createChore);
router.route('/:id').put(choreController.updateChore).delete(choreController.deleteChore);

module.exports = router;
