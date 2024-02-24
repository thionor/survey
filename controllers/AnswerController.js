const database = require("../utils/database");
const utils = require("../utils/utils");
const Answer = require("../models/Answer");

class AnswerController {
    constructor() {
        const answers = [];
    }

    async createAnswer(title, questionId) {
        try {
            const result = await database.query("INSERT INTO Answers(title, questionId, create_at) VALUES(?,?,?)", [title, questionId, utils.getTimestemp()]);
            const id = result.insertId;
            return new Answer(id, title, questionId);
        } catch(error) {
            console.log("Unable to create Answer", error);
            throw error;
        }
    }

    async findAnswerById(id) {
        try {
            const rows = await database.query("SELECT id, title, questionId FROM Answers where id = ?", [id]);
            if(rows && rows.length > 0) {
                const { id, title, questionId } = rows[0];
                return new Answer(id, title, questionId);
            }

            return { error: `Answer with id ${id} not found.` };
        } catch(error) {
            console.log("Unable to fetch answer by id");
            throw error;
        }
    }

    async findAnswerByQuestionId(questionId) {
        try {
            const rows = await database.query("SELECT id, title, questionId FROM Answers where questionId = ?", [questionId]);
            if(rows && rows.length > 0) {
                const answers = rows.map(({ id, title, questionId }) => new Answer(id, title, questionId));
                return answers;                
            }

            return { error: `Answers with question ID ${questionId} not found;` };
        } catch(error) {
            console.log("Unable to fetch answers by question ID");
            throw error;
        }
    }
}

module.exports = new AnswerController();