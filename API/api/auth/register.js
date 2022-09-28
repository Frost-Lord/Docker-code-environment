const clc = require("cli-color");
const UserSchema = require("../../Database/Schema/User.js");
module.exports = (router) => {
router.post("/register", async (req, res) => {
    let { name, password, email } = req.body;
    if (!name || !password || !email)
      return res.status(400).send({ error: "Please fill all fields" });
    let user = await UserSchema.findOne({ email: email });
    if (user) return res.send(400, "User already exists");

    let letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let usertoken = "";
    for (let i = 0; i < 50; i++) {
      let random = Math.floor(Math.random() * 2);
      if (random == 0) {
        usertoken += letters[Math.floor(Math.random() * letters.length)];
      } else {
        usertoken += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }

    let localuser = new UserSchema({
      name: name,
      password: password,
      usertoken: usertoken,
      docker: [],
      email: email,
    });
    await localuser.save();
    console.log(clc.green("Event [Auth]: " + name));
    return res.json({ localuser });
});
}