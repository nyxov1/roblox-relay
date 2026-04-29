const express = require("express");
const app = express();
app.use(express.json());

let command = "idle";

app.get("/command", (req, res) => {
    res.send(command);
    command = "idle";
});

app.post("/command", (req, res) => {
    command = req.body.cmd || "idle";
    res.send("ok");
});

app.listen(3000, () => console.log("Running"));
