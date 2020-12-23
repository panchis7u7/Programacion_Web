const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

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

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001!");
});

app.post("/login", (req,res) => {
    let encontrado = users.find((user) => {
        return (user.user === req.query.user && user.password === req.query.password);
    });
    if (encontrado)
        res.send(`El usuario ${req.query.user} se ha logueado.`);
    else
        res.send(`Usuario: ${req.query.user} no ha sido encontrado!`);
});

app.get("/", (req, res) => {
    console.log("Hola");
});