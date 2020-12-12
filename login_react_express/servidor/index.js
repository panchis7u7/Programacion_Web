const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

const users = [
    {user: 'Sebastian', password: '1234'},
    {user: 'Buki', password: 'tu_carcel'},
    {user: 'notoi', password: 'password'},
];

app.listen(4000, () => {
    console.log("Corriendo en el puerto 4000!");
});

app.get("/login", (req,res) => {
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