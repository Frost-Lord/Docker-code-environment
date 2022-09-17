const clc = require("cli-color");
const UserSchema = require("../../Database/Schema/User.js");
module.exports = (router) => {
router.post("/login", async (req, res) => {
    let { name, password } = req.body;
    let localuser = await UserSchema.findOne({ name: name });
    if (localuser) {
      if (localuser.password !== password)
        res.status(400).send("Invalid password");
      if (localuser.password === password) {
        console.log(clc.green("Event [Auth]: " + localuser.name));
        return res.json({ localuser });
      }
    } else {
      console.log("Invalid User");
      return res.status(400).send("Invalid User");
    }
});
}