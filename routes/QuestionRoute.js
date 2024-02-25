const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/QuestionController");

router.post("/create", async (req, res) => {
    try {
        const { title, type, surveyId } = req.body;
        const question = await QuestionController.createQuestion(title, type, parseInt(surveyId));

        return res.status(200).json(question);

    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Unable to create a question" });
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {title, type, surveyId} = req.body;
        const id = parseInt(req.params.id);
        const question = await QuestionController.updateQuestion(title, type, id, surveyId);

        return res.status(200).json(question);
    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Error to update survey' })
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

router.delete("/:id", async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await QuestionController.deleteQuestion(id);
        return res.status(200).json(result);
    } catch(error) {
        console.log("Error:", error);
        res.status(500).json(false);
    }
})

module.exports = router;