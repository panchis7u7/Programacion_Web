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

// ************************ CLIENTE **************************
//Mostrar todos los registros.
app.get("/cliente", (req, res) => {
    let sql = "SELECT * FROM cliente";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
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
//Actualizar registro.
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


// ************************ PROVEEDOR **************************
//Mostrar todos los registros.
app.get("/proveedor", (req, res) => {
    let sql = "SELECT * FROM proveedor";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});
//Agregar un registro.
app.post("/proveedor/insert", (req, res) => {
    let data = {
        ruc: req.body.ruc,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono1: 
        req.body.telefono1,
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
//Actualizar registro.
app.put("/proveedor/update", (req, res) => {
    let sql = "UPDATE proveedor SET ruc='" + req.body.ruc +"', " +
    "nombre='" + req.body.nombre +"', apellido='" + req.body.apellido  + "', telefono1='" + req.body.telefono1 +"', " +
    "telefono2='" + req.body.telefono2 + "', email='" + req.body.email +"', " +
    "descripcion='" + req.body.descripcion + "' WHERE id_proveedor=" + req.body.id_proveedor;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});
// Eliminar el registro.
app.delete("/proveedor/delete/:id", (req, res) => {
	let sql = "DELETE FROM proveedor WHERE id_proveedor=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});


// ************************ EMPLEADO **************************
//Mostrar todos los registros.
app.get("/empleado", (req, res) => {
    let sql = "SELECT * FROM empleado";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});
//Agregar un registro.
app.post("/empleado/insert", (req, res) => {
    let data = {
        cedula: req.body.cedula,
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono1: 
        req.body.telefono1,
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
//Actualizar registro.
app.put("/empleado/update", (req, res) => {
    let sql = "UPDATE empleado SET cedula='" + req.body.cedula +"', " +
    "nombre='" + req.body.nombre +"', apellido='" + req.body.apellido  + "', telefono1='" + req.body.telefono1 +"', " +
    "telefono2='" + req.body.telefono2 + "', direccion='" + req.body.direccion +"', " +
    "email='" + req.body.email + "', cargo='" + req.body.cargo + "' WHERE id_empleado=" + req.body.id_empleado;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});
// Eliminar el registro.
app.delete("/empleado/delete/:id", (req, res) => {
	let sql = "DELETE FROM empleado WHERE id_empleado=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});


// ************************ BODEGA **************************
//Mostrar todos los registros.
app.get("/bodega", (req, res) => {
    let sql = "SELECT * FROM bodega";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});
//Agregar un registro.
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
//Actualizar registro.
app.put("/bodega/update", (req, res) => {
    let sql = "UPDATE bodega SET nombre='" + req.body.nombre +"', capacidad='" + req.body.capacidad  + 
    "', descripcion='" + req.body.descripcion + "' WHERE id_bodega=" + req.body.id_bodega;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});
// Eliminar el registro.
app.delete("/bodega/delete/:id", (req, res) => {
	let sql = "DELETE FROM bodega WHERE id_bodega=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});


// ************************ CATEGORIA **************************
//Mostrar todos los registros.
app.get("/categoria", (req, res) => {
    let sql = "SELECT * FROM categoria";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});
//Agregar un registro.
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
//Actualizar registro.
app.put("/categoria/update", (req, res) => {
    let sql = "UPDATE categoria SET nombre='" + req.body.nombre + 
    "', descripcion='" + req.body.descripcion + "' WHERE id_categoria=" + req.body.id_categoria;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});
// Eliminar el registro.
app.delete("/categoria/delete/:id", (req, res) => {
	let sql = "DELETE FROM categoria WHERE id_categoria=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});


// ************************ DET_PEDIDO **************************
//Mostrar todos los registros.
app.get("/det_pedido", (req, res) => {
    let sql = "SELECT * FROM det_pedido";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});
//Agregar un registro.
app.post("/det_pedido/insert", (req, res) => {
    let data = {
        descripcion: req.body.descripcion,
        cantidad: req.body.cantidad,
    };
    let sql = "INSERT INTO det_pedido SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});
//Actualizar registro.
app.put("/det_pedido/update", (req, res) => {
    let sql = "UPDATE det_pedido SET descripcion='" + req.body.descripcion + 
    "', cantidad='" + req.body.cantidad + "' WHERE id_det_pedido=" + req.body.id_det_pedido;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});
// Eliminar el registro.
app.delete("/det_pedido/delete/:id", (req, res) => {
	let sql = "DELETE FROM det_pedido WHERE id_det_pedido=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});


// ************************ DET_FACTURA **************************
//Mostrar todos los registros.
app.get("/det_factura", (req, res) => {
    let sql = "SELECT * FROM det_factura";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});
//Agregar un registro.
app.post("/det_factura/insert", (req, res) => {
    let data = {
        cantidad: req.body.cantidad,
        precio_unitario: req.body.precio_unitario,
        total: req.body.total,
    };
    let sql = "INSERT INTO det_factura SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Nuevo registro anadido satisfactoriamente"}));
    });
});
//Actualizar registro.
app.put("/det_factura/update", (req, res) => {
    let sql = "UPDATE det_factura SET cantidad='" + req.body.cantidad + 
    "', precio_unitario='" + req.body.precio_unitario + "', total='" + req.body.total + "' WHERE id_det_factura=" + req.body.id_det_factura;
    let query = conn.query(sql, (err, resultado) => {
        if (err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: "Registro actualizado satisfactoriamente!"}));
    });
});
// Eliminar el registro.
app.delete("/det_factura/delete/:id", (req, res) => {
	let sql = "DELETE FROM det_factura WHERE id_det_factura=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Registro eliminado satisfactoriamente!" }));
	});
});

// ************************ FACTURA **************************
//Mostrar todos los registros.
app.get("/factura", (req, res) => {
    let sql = "SELECT id_factura, fecha_pago, c.nombre, i.nombre, f.cantidad, d.precio_unitario, precio_total FROM facturar f " +
              "INNER JOIN cliente c ON c.id_cliente = f.id_cliente " + 
              "INNER JOIN item i ON i.id_item = f.id_item " +
              "INNER JOIN det_factura d ON d.id_det_factura = f.id_det_factura;";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
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
//Actualizar registro.
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

// ************************ Item **************************
//Mostrar todos los registros.
app.get("/item", (req, res) => {
    let sql = "SELECT * FROM item;";
    let query = conn.query(sql, (err, resultado) => {
        if(err) throw err;
        res.send(JSON.stringify({status: 200, error: null, response: resultado}));
    });
});