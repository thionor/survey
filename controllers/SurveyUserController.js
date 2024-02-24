const database = require("../utils/database");
const utils = require("../utils/utils");
const SurveyUser = require("../models/SurveyUser");
const UserController = require("./UserController");

class SurveyUserController {
    constructor() {
        const surveyUsers = [];
    }

    async createSurveyUsers(surveyId, userId) {
        try {
            const result = await database.query("INSERT INTO SurveyUsers(surveyId, userId, create_at) VALUES(?,?,?)", [surveyId, userId, utils.getTimestemp()]);
            const id = result.insertId;
            return new SurveyUser(id, surveyId, userId);
        } catch(error) {
            console.log("Unable to create Survey User");
            throw error;
        }
    }

    async findSurveyUsersBySurveyId(surveyId) {
        try {
            const rows = await database.query("SELECT id, surveyId, userId FROM SurveyUsers WHERE surveyId = ?", [surveyId]);
            if(rows && rows.length > 0) {
                const surveyUsers = rows.map(({id, surveyId, userId}) => new SurveyUser(id, surveyId, userId));
                return surveyUsers;
            }

            return { error:  `Survey Users with survey ID ${surveyId} not found.` };
        } catch(error) {
            console.log("Unable to find survey users with survey ID");
            throw error;
        }
    }

    async findSurveyUsersByUserId(userId) {
        try {
            const rows = await database.query("SELECT id, surveyId, userId FROM SurveyUsers WHERE userId = ?", [userId]);
            if(rows && rows.length > 0) {
                const surveyUsers = rows.map(({ id, surveyId, userId }) => new SurveyUser(id, surveyId, userId));
                return surveyUsers;
            }

            return { error: `Survey Users with user ID ${userId} not found.` };
        } catch(error) {
            console.log("Unable to find survey users with user ID");
            throw error;
        }
    }

    async findUsersBySurveyId(surveyId) {
        try {
            const participants = await this.findSurveyUsersBySurveyId(surveyId);
            const emailParticipants = await Promise.all(participants.map(async (participant) => {
                const user = await UserController.findUserById(participant.userId)
                return user;
            }))

            return emailParticipants;
        } catch(error) {
            console.log("Unable to fetch user email by survey ID");
            throw error;
        }
    }
}

module.exports = new SurveyUserController();