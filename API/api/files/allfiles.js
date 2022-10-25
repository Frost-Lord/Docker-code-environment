const fs = require("fs");

module.exports = (router) => {
router.post("/allfiles", async (req, res) => {
    let { container, key } = req.body;
    if (!key === "elysiumnodesglichi") return res.sendStatus(403);
    if (!container) return res.send("No container id");

    const dir = `C:/Users/ewen2/Desktop/test/${container}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    let files = fs.readdirSync(dir);
    res.send(files);
});
}