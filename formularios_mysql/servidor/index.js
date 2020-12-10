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

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});

//Agregar un registro.
app.post("/cliente/insert", (req, res) => {
    let data = {
        cedula: req.body.cedula,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono1: 
        req.body.telefono1,
        telefono2: req.body.telefono2,
        direccion: req.body.direccion,
        email: req.body.email,
    };
    let sql = "INSERT INTO cliente SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});

app.post("/proveedor/insert", (req, res) => {
    let data = {
        ruc: req.body.ruc,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono1: req.body.telefono,
        telefono2: req.body.telefono2,
        email: req.body.email,
        descripcion: req.body.descripcion,
    };
    let sql = "INSERT INTO proveedor SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});

//Mostrar todos los registros.
app.get("/cliente", (req, res) => {
    let sql = "SELECT * FROM cliente";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});

app.get("/proveedor", (req, res) => {
    let sql = "SELECT * FROM proveedor";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});

app.post("/empleado/insert", (req, res) => {
    let data = {
        cedula: req.body.ruc,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono1: req.body.telefono,
        telefono2: req.body.telefono2,
        direccion: req.body.direccion,
        email: req.body.email,
        cargo: req.body.cargo,
    };
    let sql = "INSERT INTO empleado SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});

app.get("/empleado", (req, res) => {
    let sql = "SELECT * FROM empleado";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});

app.post("/bodega/insert", (req, res) => {
    let data = {
        nombre: req.body.nombre, 
        capacidad: req.body.capacidad,
        descripcion: req.body.descripcion,
    };
    let sql = "INSERT INTO bodega SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});

app.get("/bodega", (req, res) => {
    let sql = "SELECT * FROM bodega";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});

app.post("/categoria/insert", (req, res) => {
    let data = {
        nombre: req.body.nombre, 
        descripcion: req.body.descripcion,
    };
    let sql = "INSERT INTO categoria SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});

app.get("/categoria", (req, res) => {
    let sql = "SELECT * FROM categoria";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});

app.get("/det_pedido", (req, res) => {
    let sql = "SELECT * FROM det_pedido";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});

app.put("/cliente/update", (req, res) => {
    let sql = "UPDATE cliente SET cedula='" + req.body.cedula +"', " +
    "nombre='" + req.body.nombre +"', apellido='" + req.body.apellido  + "', telefono1='" + req.body.telefono1 +"', " +
    "telefono2='" + req.body.telefono2 + "', direccion='" + req.body.direccion +"', " +
    "email='" + req.body.email + "' WHERE id_cliente=" + req.body.id_cliente;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});


// Eliminar el registro.
app.delete("/cliente/delete/:id", (req, res) => {
	let sql = "DELETE FROM cliente WHERE id_cliente=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});