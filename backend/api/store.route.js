import express from "express";

const router = express.Router();

router.route("/").get((req, res) => res.send("hello world"));
router.get("/test", (req, res) => res.send(Date.now()));

export default router;
