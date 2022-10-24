const express = require('express')
const app = express()
require('dotenv').config();
const fs = require('fs');

const port = process.env.PORTOPEN;


app.post("/file", (req, res) => {
  let { uuid, key, name } = req.body;
  if (!key || key != "elysiumnodesglichi") return res.sendStatus(403);
  if (uuid !== process.env.UUID) return res.sendStatus(403);

  const folderName = name;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
  }
  res.sendStatus(200);
});
app.post("/renamefile", (req, res) => {
  let { uuid, key, dir } = req.body;
  if (!key || key != "elysiumnodesglichi") return res.sendStatus(403);
  if (uuid !== process.env.UUID) return res.sendStatus(403);

  fs.rename(dir, dir, err => {
    if (err) {
      console.error(err);
    }
  });
  res.sendStatus(200);
});
app.post("/delfile", (req, res) => {
  let { uuid, key, dir } = req.body;
  if (!key || key != "elysiumnodesglichi") return res.sendStatus(403);
  if (uuid !== process.env.UUID) return res.sendStatus(403);

  fs.rmdir(dir, { recursive: true }, err => {
    if (err) {
      throw err;
    }
  
    console.log(`${dir} is deleted!`);
  });
  res.sendStatus(200);
});
app.post("/readfile", (req, res) => {
  let { uuid, key, dir } = req.body;
  if (!key || key != "elysiumnodesglichi") return res.sendStatus(403);
  if (uuid !== process.env.UUID) return res.sendStatus(403);

  const buffer = fs.readFileSync(dir);
  const fileContent = buffer.toString();
  
  res.send(fileContent);
});

app.listen(port, () => {
  console.log(`Application starting!`)
})