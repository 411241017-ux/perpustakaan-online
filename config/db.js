const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_perpustakaan"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
    } else {
        console.log("Database Connected successfully");
    }
});

module.exports = connection;
