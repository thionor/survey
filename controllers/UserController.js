const database = require("../utils/database");
const utils = require("../utils/utils");
const User = require("../models/User");

class UserController {
    constructor() {
        this.users = [];
    }

    async createUser(email) {
        try {

            const existingUser = await this.findUserByEmail(email);

            if(existingUser) {
                return existingUser;
            }

            const token = this.generateToken();
            
            if (!token) {
                throw new Error("Error generating token");
            }
    
            const result = await database.query("INSERT INTO Users (email, token, create_at) VALUES (?, ?, ?)", [email, token, utils.getTimestemp()]);
    
            const id = result.insertId;
    
            return new User(id, email, token);
    
        } catch (error) {
            console.log("Error creating a user:", error);
            throw error;
        }
    }

    async findUserByToken(tokenParam) {
        try {
            const rows = await database.query("SELECT id, email, token FROM Users where token = ?", [tokenParam]);
            if (rows && rows.length > 0) {
                const { id, email, token } = rows[0];
                return new User(id, email, token);
            }

        } catch(error) {
            console.log("Error to fetch user by token", error);
            throw error;
        }
    }

    async findUserByEmail(email) {
        try {
            const rows = await database.query("SELECT id, email, token FROM Users where email = ?", [email]);

            if(rows && rows.length > 0) {
                const {id, email, token} = rows[0];
                return new User(id, email, token);
            }

        } catch(error) {
            console.log("Error to fetch user by email", error);
            throw error;
        }
    }
    
    async findUserById(id) {
        try {
            const rows = await database.query("SELECT id, email, token FROM Users where id = ?", [id]);

            if(rows && rows.length > 0) {
                const {id, email, token} = rows[0];
                return new User(id, email, token);
            }

        } catch(error) {
            console.log("Error to fetch user by email", error);
            throw error;
        }
    }

    generateToken() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

module.exports = new UserController();