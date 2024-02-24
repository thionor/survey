const express = require("express");
const router = express.Router();
const AnswerUserController = require("../controllers/AnswerUserController");

router.post("/create", async (req, res) => {
    try {
        const {answerId, userId} = req.body;
        const answerUser = await AnswerUserController.createAnswerUser(answerId, userId);
        return res.status(200).json(answerUser);

    } catch(error) {
        console.log("Error", error);
        res.status(500).json({ error: "Unable to create user's answers." });
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const answerUsers = await AnswerUserController.findAnswerUserByUserId(id);
        return res.status(200).json(answerUsers);

    } catch(error) {
        console.log("Error", error);
        res.status(500).json({ error: "Unable to fetch user's answers by user ID" });
    }
})

module.exports = router;