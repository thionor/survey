const database = require("../utils/database");
const utils = require("../utils/utils");
const AnswerUser = require("../models/AnswerUser");

class AnswerUserController {
    
    async createAnswerUser(answerId, userId) {
        try {
            const result = await database.query("INSERT INTO AnswerUsers(answerId, userId, create_at) VALUES(?, ?, ?)", [answerId, userId, utils.getTimestemp()]);
            const id = result.insertId;
            return new AnswerUser(id, answerId, userId);
        } catch(error) {
            console.log("Unable to create user's answers");
            throw error;
        }
    }

    async findAnswerUserByUserId(userId) {
        try {
            const rows = await database.query("SELECT answerId, userId FROM AnswerUsers where userId = ?", [userId]);
            if(rows && rows.length > 0) {
                const answerUsers = rows.map(({answerId, userId}) => new AnswerUser(answerId, userId));
                return answerUsers;
            }
            return { error: "Answers with user id ${userId} not found." };
        } catch(error) {
            console.log("Unable to fetch answers by user ID", error);
            throw error;
        }
    }
}

module.exports = new AnswerUserController();