module.exports = (router) => {
router.post("/docker-1", async (req, res) => {
    let { id, key, port } = req.body;
    if (!key || key != "elysiumnodesglichi") return res.sendStatus(403);
    if (!id) return res.send("No id");
    if (!port) return res.send("No port");

    console.log(`Port: ${port} || Server ID: ${id} || Key: ${key}`);

});
}