const express = require("express");
const router = express.Router();
const AnswerController = require("../controllers/AnswerController");

router.post("/create", async (req, res) => {
    try {
        const {title, questionId} = req.body;
        const answer = await AnswerController.createAnswer(title, questionId);
        return res.status(200).json(answer);
    } catch(error) {
        console.log("Error:", error);
        return res.status(500).json({ error: "Unable to create answers" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const answer = await AnswerController.findAnswerById(id);
        return res.status(200).json(answer);
    } catch(error) {
        console.log("Error:", error);
        return res.status(500).json({ error: "Unable to fetch answer by id" });
    }
});

router.get("/question/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const answer = await AnswerController.findAnswerByQuestionId(id);
        return res.status(200).json(answer);
    } catch(error) {
        console.log(error);
        return res.status(500).json({ error: "Unable to fetch answer by question id" });
    }
});

module.exports = router;