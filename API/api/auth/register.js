const clc = require("cli-color");
const UserSchema = require("../../Database/Schema/User.js");
module.exports = (router) => {
router.post("/register", async (req, res) => {
    let { name, password, email } = req.body;
    if (!name || !password || !email)
      return res.status(400).send({ error: "Please fill all fields" });
    let user = await UserSchema.findOne({ email: email });
    if (user) return res.send(400, "User already exists");
    let localuser = new UserSchema({
      name: name,
      password: password,
      projects: [],
      email: email,
    });
    await localuser.save();
    console.log(clc.green("Event [Auth]: " + name));
    return res.json({ localuser });
});
}