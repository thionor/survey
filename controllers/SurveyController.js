const database = require("../utils/database");
const utils = require("../utils/utils");
const Survey = require("../models/Survey");

class SurveyController {
    constructor() {
        this.surveys = {};
    }

    async createSurvey(title, description) {
        try {
            const result = await database.query("INSERT INTO Surveys (title, description, create_at) VALUES (?, ?, ?)", [title, description, utils.getTimestemp()]);
            const id = result.insertId;

            return new Survey(id, title, description);
            
        } catch(error) {
            console.log("Error creating survey", error);
            throw error;
        }
    }

    async findSurveyById(id) {
        try {

            const rows = await database.query("SELECT id, title, description FROM Surveys where id = ?", [id]);

            if(rows && rows.length > 0) {
                const {id, title, description} = rows[0];

                return new Survey(id, title, description);
            }

           return { error: `Survey with id ${id} not found` };

        } catch(error) {
            console.log("error fetch survey by id", error);
            throw error;
        }
    }


}

module.exports = new SurveyController();