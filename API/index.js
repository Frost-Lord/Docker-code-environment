const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (err, req, res, next) {
  if (!err.status) console.error(err);
  console.error(err);
  res.status(500);
});
app.set("trust proxy", true);
app.get("/", function (req, res) {
  res.send("API online!");
});

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MONGOOSE //////////////////////////////////////
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/docker",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Database.\nError: " + err);
  });
mongoose.connection.on("err", (err) => {
  console.error(`Mongoose connection error: \n ${err.stack}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection disconnected");
});
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// API //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

  fs.readdirSync("./api/docker").forEach((file) => {
    app.use("/docker", router);
    require(`./api/docker/${file}`)(router);
    console.log(`${file} loaded!`);
  });

  fs.readdirSync("./api/auth").forEach((file) => {
    app.use("/auth", router);
    require(`./api/auth/${file}`)(router);
    console.log(`${file} loaded!`);
  });

///////////////////////////////////////////////////////////////////////////////////////////////
//Listners
///////////////////////////////////////////////////////////////////////////////////////////////

app.listen(7777, () => {
  console.log(
   "//////////////////////////////////////////////////////////////////////////////////////////////////"
  );
    console.log("App running at:");
    console.log("- Local Server: 7777 ");
    console.log("- Website Server: localhost:7777");
    console.log(
    "//////////////////////////////////////////////////////////////////////////////////////////////////"
   );
 });