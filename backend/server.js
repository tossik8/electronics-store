import express from "express";
import cors from "cors";
import store from "./api/store.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", store);
app.use("*", (req, res) => res.status(404).send("Error"));

export default app;
