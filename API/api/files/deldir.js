const clc = require("cli-color");
const fs = require("fs");

module.exports = (router) => {
router.post("/deldir", async (req, res) => {
    let { container, key, name } = req.body;
    if (!key === "elysiumnodesglichi") return res.sendStatus(403);
    if (!container) return res.send("No container specified");
    if (!name) return res.send("No name");

    const dir = `C:/Users/ewen2/Desktop/test/${container}`;
    if (!fs.existsSync(dir + "/" + name)) {
        return res.send("File does not exist");
    } else {
        fs.rmdir(dir + "/" + name, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            res.send("Deleted");
        });
    } 
});
}