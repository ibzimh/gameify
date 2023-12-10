//Viet
const express = require('express');
const Category = require('../model/category.model.js');
const router = express.Router();

// Get All Categories
router.route('/').get(async (req, res) => {
    try {
      const categories = await Category.find();
  
      return res.status(200).json({
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
//Get category by id
  router.route('/:id').get(async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const category = await Category.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      return res.status(200).json({
        data: category,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  //create new category
  router.route('/').post(async (req, res) => {
    try {
      const { category_name } = req.body;
  
      const newCategory = new Category({
        category_name,
      });
  
      await newCategory.save();
  
      return res.status(201).json({
        data: newCategory,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
//update category by id
  router.route('/:id').put(async (req, res) => {
    try {
      const categoryId = req.params.id;
      const updatedData = req.body;
  
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedData, { new: true });
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      return res.status(200).json({
        data: updatedCategory,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  //delete category by id
  router.route('/:id').delete(async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
  
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      return res.status(200).json({
        message: 'Category deleted successfully',
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });
  

    module.exports = router;
