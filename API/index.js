const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

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


fs.readdirSync("./api").forEach((file) => {
    app.use("/", router);
    require(`./api/${file}`)(router);
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