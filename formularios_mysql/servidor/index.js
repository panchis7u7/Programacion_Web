const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const app = express();

//Parse application/json
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "tienda_musica",
});

conn.connect((err) => {
    if(err) throw err;
    console.log("MYSQL conectado!");
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});

app.post("/api/create", (req, res) => {
    
});