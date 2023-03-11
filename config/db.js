//ไฟล์สำหรับเชื่อมข้อมูลกับdatabase

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./database/user.sqlite');

//ถ้าไม่มีไฟล์ที่ชื่อว่า user
db.run(`CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    status INTEGER
)`);

module.exports = db;