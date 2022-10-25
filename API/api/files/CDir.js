const clc = require("cli-color");
const fs = require("fs");

module.exports = (router) => {
router.post("/cdir", async (req, res) => {
    let { container, key, name } = req.body;
    console.log(clc.greenBright(`container: ${id} New file`));
    if (!key === "elysiumnodesglichi") return res.sendStatus(403);
    if (!container) return res.send("No id");
    if (!name) return res.send("No name");

    const dir = `C:/Users/ewen2/Desktop/test/${container}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    const dir2 = `C:/Users/ewen2/Desktop/test/${container}/${name}`;
    if (!fs.existsSync(dir2)){
        fs.mkdirSync(dir2);
    }
    
    
    res.sendStatus(200);    
});
}