const express = require("express");
const router = express.Router();
const SurveyController = require("../controllers/SurveyController");

router.post("/create", async (req, res) => {
    try {

        const {title, description} = req.body;
        const survey = await SurveyController.createSurvey(title, description);

        return res.status(200).json(survey);
    } catch(error) {
        console.log("Error:", error );
        res.status(500).json({ error: 'Error to create survey' });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const {title, description} = req.body;
        const id = parseInt(req.params.id);
        const survey = await SurveyController.updateSurvey(title, description, id);

        return res.status(200).json(survey);
    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Error to update survey' })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const survey = await SurveyController.findSurveyById(id);

        return res.status(200).json(survey);
    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Error to get survey by id' });
    }
});
router.get("/:id/all", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const survey = await SurveyController.getSurveyData(id);

        return res.status(200).json(survey);
    } catch(error) {
        console.log("Error:", error);
        res.status(500).json({ error: 'Error to get survey by id' });
    }
});

module.exports = router;