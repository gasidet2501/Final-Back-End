const express = require("express");
const router = express.Router(); //ดัก path เส้นทางของ URL
const db = require("../config/db.js");


const app = express();

app.use(express.json()); //ใช้ตัวกลางในการส่งข้อมูลในรูปแบบ json

//มี2พารา 1คือpathตรงurl 2คือcallback
router.get('/', (req,res) => {
 db.all('SELECT * FROM user', (err,rows) => {
    if (err) {
        res.status(500).send(err);
     }
    else {
        //res.status.send(rows);
        res.status(200).send(rows); //format ตัว rows ให้เป็น json แล้วส่งข้อมูลให้มาแสดง
    }
 });
});

router.get('/:id', (req,res) => {
    db.get('SELECT * FROM user WHERE id = ?', req.params.id, (err,rows) => {
       if (err) {
           res.status(500).send(err);
        }
       else {
            if(!rows){
                res.status (404).send('Book not found');
            }
            else{
                //res.status.send(rows);
                res.status(200).send(rows); //format ตัว rows ให้เป็น json แล้วส่งข้อมูลให้มาแสดง
            }
        }
    });
   });



router.post('/post', (req,res) => {
    // db.run();
    
    const value = req.query;
    
    db.run('INSERT INTO user (name, email, password, status) VALUES (?, ?, ?, ?)',
    value.name, value.email, value.password, value.status, function(err) {
        if (err) {
            res. status (500).send(err);
        }
        else {
            value.id = this.lastID; //lastid = ไอดีตัวถัดไปที่ยังว่างอยู่
            res.status(200).send(value);
        }
        });

});

router.put('/put/:id', (req, res) => {
    const value = req.query;
    db.run('UPDATE user SET name = ?, email = ? , password = ?, status = ? WHERE id = ?', value.name, value.email, value.password, value.status, req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(value);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    db.run('DELETE FROM user WHERE id = ?', req.params.id, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send({});
        }
    });
});


module.exports = router;