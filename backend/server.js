require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

const port = process.env.PORT || 3000;

app.get("/api/v1/test", async (req, res) => {
    console.log(await db.query("SELECT * FROM person", []));
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
