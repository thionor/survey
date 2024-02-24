const database = require("../utils/database");
const utils = require("../utils/utils");
const Question = require("../models/Question");

class QuestionController {
    constructor() {
        const question = {};
    }

    async createQuestion(title, surveyId) {
        try {
            const result = database.query("INSERT INTO Questions(title, surveyId, create_at) VALUES(?, ?, ?)", [title, surveyId, utils.getTimestemp()]);
            const id = result.insertId;
            
            return new Question(id, title, surveyId);

        } catch(error) {
            console.log("Unable to create question", error);
            throw error;
        }
    }

    async findQuestionBySurveyId(surveyId) {
        try {
            const rows = await database.query("SELECT id, title, surveyId FROM Questions where surveyId = ?", [surveyId]);
            if(rows && rows.length > 0) {
                const question = rows.map(({id, title, surveyId}) => new Question(id, title, surveyId));
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
            const rows = await database.query("SELECT id, title, surveyId FROM Questions where id = ?", [id]);
            if(rows && rows.length > 0) {
                const {id, title, surveyId} = rows[0];
                return new Question(id, title, surveyId);
            }

            return { error: `Question with id ${id} not found.` };
        } catch(error) {
            console.log("Unable to fetch questions by id");
            throw error;
        }
    }
}

module.exports = new QuestionController();