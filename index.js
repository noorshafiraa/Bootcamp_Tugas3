// Library
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Panggil express function
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Setting client / front-end
app.set("view engine", "ejs");

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "*Fira101101",
    database: "bootcampday3"
})

db.connect((err) => {
    if (err) throw err;
    console.log("Database connected!");
})

// Route
app.get("/form", (req, res) => {
    res.render("form")
})
// 1. Baca Data dari database
app.get("/readdata", (req,res) => {
    const sql = "SELECT * FROM matkul";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
})
// 2. Create / Post data ke database
app.post("/postdata", (req, res) => {
    const nama = req.body.nama;
    const kode = req.body.kode;
    const dosen = req.body.dosen;

    const sql = "INSERT INTO matkul (nama, kode, dosen) VALUES (?, ?, ?)";
    const values = [nama, kode, dosen];
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.json({
            message: "Data Submitted!"
        });
    })
})

// 3. Update Data
app.put("/editdata/:id", (req, res) => {
    const dosen = req.body.dosen;
    const id = req.params.id;

    const sql = "UPDATE matkul SET dosen = ? WHERE idmatkul = ?";
    const values = [dosen, id]
    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send("Data Updated!");
    })
})

// 4. Delete Data
app.delete("/deletedata/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM matkul WHERE idmatkul = ?";

    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.send("Data Deleted!")
    })
})

// Start Server
app.listen(3000, () => {
    console.log('Server started...')
});