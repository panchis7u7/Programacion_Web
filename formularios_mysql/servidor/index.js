const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

//Parse application/json
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

/* app.use((req, res) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
}); */

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

//Agregar un registro.
app.post("/api/create", (req, res) => {
    let data = {
        id_cliente: 1,
        cedula: req.body.cedula,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono1: req.body.telefono,
        telefono2: req.body.telefono2,
        direccion: req.body.direccion,
        email: req.body.email,
    };
    //let sql = "INSERT INTO cliente (id_cliente, cedula, nombre, apellido, telefono1, telefono2, direccion, email) VALUES " +
    //"()";
    let sql = "INSERT INTO cliente SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});

//Mostrar todos los registros.
app.get("/api/view", (req, res) => {
    let sql = "SELECT * FROM cliente";
});