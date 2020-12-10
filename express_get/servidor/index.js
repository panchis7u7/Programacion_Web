const expresss = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = expresss();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

app.listen(3002, () => {
    console.log("Corriendo en el puerto 3002");
});

app.get("/" , (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get("/index.html" , (req, res) => {
    res.redirect('/');
});

app.get("/hola", (req, res) => {
    res.send("Hola desde '/hola'");
});

app.get("/prueba", (req, res) => {
    res.send("Hola desde '/prueba'");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + '/404.html');
});