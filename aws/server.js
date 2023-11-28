const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config({ path: "config.env" });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const choreRouter = require('./route/choreRoute.js');
const userRouter = require('./route/userRoute.js');
const authRouter = require('./route/authenticationRoute.js');
const rewardRouter = require('./route/rewardRoute.js');
const categoryRouter = require('./route/categoryRoute.js');

app.use('/users', userRouter);
app.use('/chores', choreRouter);

app.get('/oauth2proxy/*', (req, res) => {
  fs = require('fs');
  res.writeHead(200);
  res.write(fs.readFileSync('page.html'));
  // res.redirect(process.env.EXPO_GO_URL);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
