const express = require("express");
// const db = require("./config/db.js");
const user = require("./routes/router.js");
const app = express();

app.use("/user",user); //ถ้า url เป็น/user จะเรียกใช้ user ที่เรา require มาจาก routes

const port = process.env.PORT || 3000;

//เป็นการจำลอง server ที่ port 3000
app.listen(port, () =>  console.log(`Listening on port ${port}...`));
//พอ run จาก 3000 แล้วจะทำในส่วนของฟังก์ชั่นที่แสดงต่อ

