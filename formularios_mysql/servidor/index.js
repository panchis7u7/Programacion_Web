const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});