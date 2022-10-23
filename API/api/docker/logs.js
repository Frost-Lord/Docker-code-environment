const clc = require("cli-color");
const { exec } = require("child_process");


module.exports = (router) => {
router.post("/logs", async (req, res) => {
    let { id, key } = req.body;
    console.log(clc.greenBright(`Logs: ${id}`));
    if (!key === "elysiumnodesglichi") return res.sendStatus(403);
    if (!id) return res.send("No id");

    exec(`docker logs --tail 20 ${id}`, async (error, stdout) => {
      let response = error || stdout;
      if (error) {
        console.log(error);
      } else {
        res.send(response);
      }
    });
});
}