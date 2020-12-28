const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
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
    //Encontrar en la BD el usuario, ojo... este encriptado con AES-128-ECB!.
    let sql = `SELECT id_usuario, usuario, CAST(AES_DECRYPT(contraseña, '${llave}') AS CHAR(255)) AS contraseña FROM usuarios WHERE usuario = '${req.body.user}' AND ` +
    `AES_DECRYPT(contraseña, '${llave}') = '${req.body.password}'`; 

    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        console.log(resultado);
        if (resultado != "")
            res.redirect(`/Login/welcome?user=${req.body.user}`);
        else
            res.redirect(`/Login/welcome?user=error`);
    });
});

app.get('/', (req, res) => {
    console.log("Hola");
});

app.get('/login/welcome', (req, res) => {
    var query = req.query.user;
    res.sendFile(__dirname + '/public/html/after_login.html', {});
});