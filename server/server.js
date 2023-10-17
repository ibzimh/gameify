const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
let categories = [
  {category_id: 2, category_name: "CS320"},
  {category_id: 3, category_name: "CS311"},
  {category_id: 4, category_name: "CS345"},
];
app.get('/categories', (req, res) => {res.json(categories);});

app.get('/categories/:id', (req,res) => {
  const category = categories.find(x => x.category_id === parseInt(req.params.category_id));
  if(!category) return res.status(404).send('Category not found');
  res.json(category);
});

app.post('/categories', (req, res) => {
  const category = {
    category_id: categories.length + 1,
    category_name: req.body.conent
  };
  articles.push(article);
  res.json(article);
});


// get driver connection
const dbo = require("./db/conn.js");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${port}`);
});