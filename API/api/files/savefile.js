const clc = require("cli-color");
const fs = require("fs");

module.exports = (router) => {
router.post("/savefile", async (req, res) => {
    let { container, key, name, data } = req.body;
    if (!key === "elysiumnodesglichi") return res.sendStatus(403);
    if (!container) return res.send("No container specified");
    if (!name) return res.send("No name");

    const dir = `C:/Users/ewen2/Desktop/test/${container}`;
    if (!fs.existsSync(dir + "/" + name)) {
        return res.send("File does not exist");
    } else {
        fs.writeFile(dir + "/" + name, data, function (err) {
            if (err) {
                return console.log(err);
            }
            res.send("Saved");
        });
    } 
});
}