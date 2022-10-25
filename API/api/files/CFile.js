const clc = require("cli-color");
const fs = require("fs");

module.exports = (router) => {
router.post("/cfile", async (req, res) => {
    let { container, key, name } = req.body;
    console.log(clc.greenBright(`container: ${id} New file`));
    if (!key === "elysiumnodesglichi") return res.sendStatus(403);
    if (!container) return res.send("No id");
    if (!name) return res.send("No name");

    const dir = `C:/Users/ewen2/Desktop/test/${container}`;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFile(`${dir}/${name}`, "", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.sendStatus(200);    
});
}