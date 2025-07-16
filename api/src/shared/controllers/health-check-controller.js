export async function healthCheckController(req, res) {
    res.status(200).send("API is ok");
}
