const database = require("../utils/database");
const utils = require("../utils/utils");
const Question = require("../models/Question");

class QuestionController {
    constructor() {
        const question = {};
    }

    async createQuestion(title, type, surveyId) {
        try {
            const result = await database.query("INSERT INTO Questions(title, type, surveyId, create_at) VALUES(?, ?, ?, ?)", [title, type, surveyId, utils.getTimestemp()]);
            const id = result.insertId;
            
            return new Question(id, title, type, surveyId);

        } catch(error) {
            console.log("Unable to create question", error);
            throw error;
        }
    }

    async updateQuestion(title, type, questionId, surveyId) {
        try {
            const result = await database.query("UPDATE Questions SET title = ?, type = ? WHERE id = ? AND surveyId = ?" , [title, type, questionId, surveyId]);
            if(result.affectedRows > 0) {
                return new Question(questionId, title, type, surveyId);
            }
           
            return null;
        } catch(error) {
            console.log("Error to update question", error)
            throw error;
        }
    }

    async findQuestionBySurveyId(surveyId) {
        try {
            const rows = await database.query("SELECT id, title, type, surveyId FROM Questions where surveyId = ?", [surveyId]);
            if(rows && rows.length > 0) {
                const question = rows.map(({id, title, type, surveyId}) => new Question(id, title, type, surveyId));
                return question;
            }

            return { error: `Questions with survey id ${surveyId} not found.` };

        } catch(error) {
            console.log("Unable to find questions by survey id");
            throw error;
        }
    }

    async findQuestionById(id) {
        try {
            const rows = await database.query("SELECT id, title, type, surveyId FROM Questions where id = ?", [id]);
            if(rows && rows.length > 0) {
                const {id, title, type, surveyId} = rows[0];
                return new Question(id, title, type, surveyId);
            }

            return { error: `Question with id ${id} not found.` };
        } catch(error) {
            console.log("Unable to fetch questions by id");
            throw error;
        }
    }

    async deleteQuestion(id) {
        try {
            const result = await database.query("DELETE FROM Questions WHERE id = ?", [id]);
            if(result.affectedRows > 0) {
                return true;
            }
        } catch(error) {
            console.log("unable to delete question by id")
            throw error;
        } 
    }
}

module.exports = new QuestionController();