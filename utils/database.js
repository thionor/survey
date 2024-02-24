const mysql = require("mysql2/promise");

class Database {
    constructor() {
        this.config = {
            host: "localhost",
            user: "root",
            password: "admin",
            database: "survey"
        }

        this.pool = mysql.createPool(this.config);
    }

    async query(sql, values = {}) {
        try {
            const connection = await this.pool.getConnection();
            const [result] = await connection.execute(sql, values);
            
            connection.release();

            return result;

        } catch(error) {
            console.log("erro na consulta SQL: ", error);
            throw error;
        }
    }
}

module.exports = new Database();