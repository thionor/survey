const express = require("express");
const router = express.Router();
const SurveyUserController = require("../controllers/SurveyUserController");

router.post("/create", async (req, res) => {
    try {
        const { surveyId, userId } = req.body;
        const surveyUser = await SurveyUserController.createSurveyUsers(surveyId, userId);
        return res.status(200).json(surveyUser);
    } catch(error) {
        console.log("Error", error);
        return res.status(500).json({ error: "Unable to create survey user" });
    }
});

router.get("/survey/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const surveyUser = await SurveyUserController.findSurveyUsersBySurveyId(id);
        return res.status(200).json(surveyUser);
    } catch(error) {
        console.log("Error", error);
        res.status(500).json({ error: "Unable to fetch survey user by survey ID" });
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const surveyUser = await SurveyUserController.findSurveyUsersByUserId(id);
        return res.status(200).json(surveyUser);
    } catch(error) {
        console.log("Error", error);
        res.status(500).json({ error: "Unable to fetch survey user by user ID" });
    }
})

router.get("/survey/:id/users", async (req, res) => {
    try {
        const id = req.params.id;
        const surveyUser = await SurveyUserController.findUsersBySurveyId(id);
        return res.status(200).json(surveyUser);
    } catch(error) {
        console.log("Error", error);
        res.status(500).json({ error: "Unable to fetch user email by survey ID" });
    }
})

module.exports = router;