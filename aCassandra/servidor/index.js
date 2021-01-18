const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const casssandra = require('cassandra-driver');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: '*'}));

let cliente = new casssandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'dc1', keyspace: 'prueba'})

cliente.connect(error => {
    if (error) throw error;
    console.log('Conexion con cassandra exitosa!');
})

app.listen('3001', () => {
    console.log("Servidor corriendo en el puerto 3001!");
});

app.post('/starbucks/add', (req, res) => {
    console.log(req.body);
    res.send();
});

app.get("/starbucks", (req, res) => {
    let query = "SELECT * FROM starbucks LIMIT 1";
    cliente.execute(query).then(result => {
        console.log(result.rows[0]);
        res.send(JSON.stringify({status: 200, error: null, response: result}));
    }
)});
