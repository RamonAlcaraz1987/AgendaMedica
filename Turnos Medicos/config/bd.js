require("dotenv").config();
const mysql = require("mysql2/promise");

const createConnection = async () => {
    try {
        const connection = await mysql.createConnection({
            port: process.env.DB_PORT || 3306,
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('CONEXIÓN EXITOSA');
        return connection;
    } catch (error) {
        console.error('Error de conexión:', error);
        throw error;
    }
};

module.exports = createConnection;