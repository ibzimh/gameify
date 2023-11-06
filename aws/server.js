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

const usersRouter = require("./route/choreRoute.js");

app.use("/chores", usersRouter);

app.get('/oauth2proxy/', (req, res) => {
  // res.redirect(process.env.EXPO_GO_URL);
});

app.get('/oauth2proxy/google/*', (req, res) => {
  // res.redirect(process.env.EXPO_GO_URL);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});