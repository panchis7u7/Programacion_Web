const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
//Se obtiene el objeto del manejador de encriptacion, que se encargara de desencriptar los de datos recibidos del lado del cliente.
const encryption = require('./EncryptionHandler');

const app = express();

//Llave para desencriptar las contraseñas consultadas de MySql con AES!.
const llave = 'Secreto';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: '*'}));
app.use('/public', express.static('public'));



const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Login",
});

conn.connect((err) => {
    if(err) throw err;
    console.log("MYSQL conectado!");
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001!");
});

app.post('/login', (req,res) => {
    console.log(req.body.password);
    //Encontrar en la BD el usuario, ojo... este encriptado con AES-128-ECB!.
    let sql = `SELECT id_usuario, usuario FROM usuarios WHERE usuario = '${req.body.user}' AND ` +
    `AES_DECRYPT(contraseña, '${llave}') = '${encryption.decrypt(req.body.password)}'`; 

    //En caso de que se quiera ver toda la consulta, comentar la consulta de arriba y usar la consulta de abajo:
    /*------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let sql = `SELECT id_usuario, usuario, CAST(AES_DECRYPT(contraseña, '${llave}') AS CHAR(255)) AS contraseña FROM usuarios WHERE usuario = '${req.body.user}' AND ` +
    `AES_DECRYPT(contraseña, '${llave}') = '${encryption.decrypt(req.body.password)}'`; 
    *///----------------------------------------------------------------------------------------------------------------------------------------------------------------

let query = conn.query(sql, (err, resultado) => {
    if (err) throw err;
    console.log(resultado);
    if (resultado != "")
        res.send(JSON.stringify({redirect: `login/welcome?user=${req.body.user}`, user: `${req.body.user}`,}));
    else
        res.send(JSON.stringify({redirect: `login/error?user=${req.body.user}`, user: `${req.body.user}`,}));
    });
});

app.get('/', (req, res) => {
    console.log("Hola");
});