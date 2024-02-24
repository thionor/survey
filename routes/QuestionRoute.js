const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/QuestionController");

router.post("/create", async (req, res) => {
    try {
        const { title, surveyId } = req.body;
        const question = await QuestionController.createQuestion(title, parseInt(surveyId));

        return res.status(200).json(question);

    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Unable to create a question" });
    }
})

router.get("/survey/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const questions = await QuestionController.findQuestionBySurveyId(id);
        return res.status(200).json(questions);
    } catch(error) {
        return res.status(500).json({ error: "Unable to fetch questions by survey id" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const question = await QuestionController.findQuestionById(id);
        return res.status(200).json(question);
    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Unable to fetch question by id" });
    }
});

module.exports = router;