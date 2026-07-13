const fs = require('fs');
const mysql = require('mysql2/promise');

async function setupDb() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            multipleStatements: true
        });

        const sql = fs.readFileSync('setup_db.sql', 'utf8');
        await connection.query(sql);
        console.log('Database successfully initialized from setup_db.sql');
        
        await connection.end();
    } catch (error) {
        console.error('Error setting up database:', error);
    }
}

setupDb();
