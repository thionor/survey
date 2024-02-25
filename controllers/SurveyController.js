const database = require("../utils/database");
const utils = require("../utils/utils");
const Survey = require("../models/Survey");
const QuestionController = require("./QuestionController");
const AnswerController = require("./AnswerController");

class SurveyController {
    constructor() {
        this.surveys = {};
    }

    async getSurveyData(id) {
        try {
            const survey = await this.findSurveyById(id);

            if ("error" in survey) {
                return survey;
            }
            const questions = await QuestionController.findQuestionBySurveyId(id);

            const surveyData = {
                id: survey.id,
                title: survey.title,
                description: survey.description,
                draggedAnswerIndex: null,
                questions: []
            }

            if (questions.length > 0) {
                for (const question of questions) {
                    console.log(question)
                    const answers = await AnswerController.findAnswerByQuestionId(question.id);
                    if (answers.length > 0) {
                        surveyData.questions.push({
                            id: question.id,
                            title: question.title,
                            type: question.type,
                            answers: answers.map(answer => ({
                                id: answer.id,
                                title: answer.title
                            }))
                        })
                    }
                }
            }
            return surveyData;

        } catch (error) {
            console.log("Error to fetch survey with id: " + id);
            throw error;
        }
    }

    async createSurvey(title, description) {
        try {
            const result = await database.query("INSERT INTO Surveys (title, description, create_at) VALUES (?, ?, ?)", [title, description, utils.getTimestemp()]);
            const id = result.insertId;

            return new Survey(id, title, description);

        } catch (error) {
            console.log("Error creating survey", error);
            throw error;
        }
    }

    async updateSurvey(title, description, surveyId) {
        try {
            const result = await database.query("UPDATE Surveys SET title = ?, description = ? WHERE id = ?" , [title, description, surveyId]);
            if(result.affectedRows > 0) {
                return new Survey(surveyId, title, description);
            }
           
            return null;
        } catch(error) {
            console.log("Error to update survey", error)
            throw error;
        }
    }

    async findSurveyById(id) {
        try {

            const rows = await database.query("SELECT id, title, description FROM Surveys where id = ?", [id]);

            if (rows && rows.length > 0) {
                const { id, title, description } = rows[0];

                return new Survey(id, title, description);
            }

            return { error: `Survey with id ${id} not found` };

        } catch (error) {
            console.log("error fetch survey by id", error);
            throw error;
        }
    }
}

module.exports = new SurveyController();