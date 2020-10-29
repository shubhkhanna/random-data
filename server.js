const http = require("http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const port = process.env.PORT || 8080;

const factRoute = require("./routes/facts");
const riddleRoute = require("./routes/riddles");
const quoteRoute = require("./routes/quotes");

http.createServer();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DataBase Connected!"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS error removal
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({ message: "Fetched!" });
  }
  next();
});

app.get("/", (req, res) => {
  res.json({
    Success: "Hit to diiferent endpoints i.e. /facts /riddles /quotes",
  });
});

app.use("/facts", factRoute);
app.use("/riddles", riddleRoute);
app.use("/quotes", quoteRoute);

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
