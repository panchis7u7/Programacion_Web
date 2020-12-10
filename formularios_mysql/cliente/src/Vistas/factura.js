import React from "react";
import {Container,Row,Form,FormControl,FormLabel,Button,Alert,Table,Col, Dropdown} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Factura extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        registros: [],
        registrosEmp: [],
        registrosCli: [],
        registrosItem: [],
        registrosFact: [],
        id_factura: "",
        fecha_pago: "",
        hora_pago: "",
        tipo_pago: "",
        cantidad: "",
        nombre: "",
        nombre_parte: "",
        precio_unitario: "",
        precio_total: "",
        alerta: false,
        msgAlerta: "",
        tipoAlerta: "success",
        hoverBtn1: false,
    };
  }

  componentDidMount() {
    this.fetchRegistros();
    this.fetchRegistrosEmp();
    this.fetchRegistrosCli();
    this.fetchRegistrosItem();
    this.fetchRegistrosFact();
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  //Añadir un registro.
  addRegistro = () => {
    var cabezales = new Headers();
    cabezales.append("Content-Type", "application/json");
    var cuerpo = JSON.stringify({
        id_factura: this.state.id_factura,
        fecha_pago: this.state.fecha_pago,
        nombre: this.state.nombre,
        nombre_parte: this.state.nombre_parte,
        cantidad: this.state.cantidad,
        precio_unitario: this.state.precio_unitario,
        precio_total: this.state.precio_total,
    })
    fetch("http://localhost:3001/cliente/insert", {
      method: "POST",
      headers: cabezales,
      body: cuerpo
    }).then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log(resultado);
        this.setState({
          cedula: "",
          nombre: "",
          apellido: "",
          telefono1: "",
          telefono2: "",
          direccion: "",
          email: "",
          alerta: true,
          msgAlerta: resultado.response,
          tipoAlerta: "success",
        });
        this.fetchRegistros();
      });
  };

  fetchRegistros = () => {
    let cabezales = new Headers();
    cabezales.append("Content-Type", "application/json");
    fetch("http://localhost:3001/factura", {
      method: "GET",
      headers: cabezales,
    })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log("resultado: ", resultado);
        this.setState({
          registros: resultado.response,
        });
      })
      .catch((error) => console.log("error: ", error));
  };

  editRegistro = (id) => {
    let cabezales= new Headers();
    cabezales.append("Content-Type", "application/json");
    let cuerpo = JSON.stringify({
      id_cliente: id,
      cedula: this.state.cedula,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      telefono1: this.state.telefono1,
      telefono2: this.state.telefono2,
      direccion: this.state.direccion,
      email: this.state.email,
    });
    console.log(cuerpo);
    fetch("http://localhost:3001/cliente/update", {
      method: "PUT",
      headers: cabezales,
      body: cuerpo,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
        id_factura: "",
        fecha_pago: "",
        nombre: "",
        nombre_parte: "",
        cantidad: "",
        precio_unitario: "",
        precio_total: "",
        alerta: true,
        msgAlerta: resultado.response,
        tipoAlerta: "success",
      });
      this.fetchRegistros();
    })
    .catch((error) => console.log("error: ", error));
  };

  updateInput = (item) => {
    if(this.state.hoverBtn1 === true){
      return;
    } else {
    this.setState({
      id_factura: item.id_factura,
      fecha_pago: item.fecha_pago,
      nombre: item.nombre,
      nombre_parte: item.nombre_parte,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario,
      precio_total: item.precio_total,
    });
  }
  };

  eliminarRegistro = (id) => {
    fetch("http://localhost:3001/cliente/delete/" + id, {
    method: "DELETE",
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      this.setState({
        alerta: true,
        msgAlerta: resultado.response,
        tipoAlerta: "danger",
      });
      this.fetchRegistros();
    })
    .catch((error) => console.log("error: ", error));
  };

  fetchRegistrosEmp = () => {
    let cabezales = new Headers();
    cabezales.append("Content-Type", "application/json");
    fetch("http://localhost:3001/empleado", {
      method: "GET",
      headers: cabezales,
    })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log("resultado: ", resultado);
        this.setState({
          registrosEmp: resultado.response,
        });
      })
      .catch((error) => console.log("error: ", error));
  };

  fetchRegistrosCli = () => {
    let cabezales = new Headers();
    cabezales.append("Content-Type", "application/json");
    fetch("http://localhost:3001/cliente", {
      method: "GET",
      headers: cabezales,
    })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log("resultado: ", resultado);
        this.setState({
          registrosCli: resultado.response,
        });
      })
      .catch((error) => console.log("error: ", error));
  };

  fetchRegistrosItem = () => {
    let cabezales = new Headers();
    cabezales.append("Content-Type", "application/json");
    fetch("http://localhost:3001/item", {
      method: "GET",
      headers: cabezales,
    })
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log("resultado: ", resultado);
        this.setState({
          registrosItem: resultado.response,
        });
      })
      .catch((error) => console.log("error: ", error));
  };

  fetchRegistrosFact = () => {
    let cabezales = new Headers();
    cabezales.append("Content-Type", "application/json");
    fetch("http://localhost:3001/det_factura", {
        method: "GET",
        headers: cabezales,
    })
        .then((respuesta) => respuesta.json())
        .then((resultado) => {
            console.log("resultado: ", resultado);
            this.setState({
                registrosFact: resultado.response,
            });
        })
        .catch((error) => console.log("error: ", error));
};

  render() {
    return (
      <div>
        <Container>
          {
            this.state.alerta === true ? (
              <Alert variant={this.state.tipoAlerta} onClose={() => {
                this.setState({
                  alerta: false,
                })
              }} dismissible>
                <Alert.Heading>{this.state.msgAlerta}</Alert.Heading>
              </Alert>
            ) : null}
          <Row>
            <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th class="align-middle">Id</th>
                  <th class="align-middle">Fecha de Pago</th>
                  <th class="align-middle">Nombre</th>
                  <th class="align-middle">Nombre de la Parte</th>
                  <th class="align-middle">Cantidad</th>
                  <th class="align-middle">Precio Unitario</th>
                  <th class="align-middle">Precio Total</th>
                  <th class="align-middle" colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.registros.map((item) => {
                  return (
                    <tr onClickCapture={() => this.updateInput(item)}>
                      <td class="align-middle">{item.id_factura}</td>
                      <td class="align-middle">{item.fecha_pago}</td>
                      <td class="align-middle">{item.nombre}</td>
                      <td class="align-middle">{item.nombre_parte}</td>
                      <td class="align-middle">{item.cantidad}</td>
                      <td class="align-middle">{item.precio_unitario}</td>
                      <td class="align-middle">{item.precio_total}</td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                onClick={() => {this.editRegistro(item.id_cliente)}} variant="info">Actualizar</Button>
                      </td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}} 
                                onClick={() => {this.eliminarRegistro(item.id_cliente)}} variant="danger">Eliminar</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Container>
        <Container className="padd">
          <Form>
            <Form.Row>
              <Col sm={2}> </Col>
              <Col sm={4}>
               <br></br>
                <FormLabel>Fecha de Pago:</FormLabel>
                <FormControl type="date" name="fecha_pago" placeholder="Ingrese la fecha de pago." onChange={this.handleChange} value={this.state.cedula} />
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Hora de Pago:</FormLabel>
                <FormControl type="time" name="hora_pago" placeholder="Seleccione la hora de pago." onChange={this.handleChange} value={this.state.nombre} required={true}></FormControl>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Nombre de la parte: </FormLabel>
                <FormControl type="text" name="nombre_parte" placeholder="Ingrese el nombre de la parte." onChange={this.handleChange} value={this.state.apellido} required={true}/>
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Cantidad: </FormLabel>
                <FormControl type="number" name="cantidad" placeholder="Ingrese la cantidad." onChange={this.handleChange} value={this.state.telefono1} required={true}/>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Precio unitario:</FormLabel>
                <FormControl type="number" name="precio_unitario" placeholder="Ingrese el precio unitario." onChange={this.handleChange} value={this.state.telefono2} />
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Precio Total:</FormLabel>
                <FormControl type="number" name="precio_total" placeholder="Ingrese el precio total." onChange={this.handleChange} value={this.state.direccion} required={true}/>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Tipo de pago:</FormLabel>
                <FormControl type="text" name="tipo_pago" placeholder="Tipo de pago." onChange={this.handleChange} value={this.state.tipo_pago} />
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Cliente:</FormLabel>
                <FormControl as="select" name="cliente" placeholder="Seleccione el empleado: ." onChange={this.handleChange} value={this.state.nombre} required={true}>
                {this.state.registrosCli.map((item) => {
                        return (
                         <FormControl as="option" key={item.nombre} value={item.nombre}>{item.nombre}</FormControl>
                    );
                    })}
                </FormControl>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
              <br></br>
                <FormLabel>Empleado: </FormLabel>
                <FormControl as="select" name="empleado" onChange={this.handleChange} value={this.state.email} required={true}>
                    {this.state.registrosEmp.map((item) => {
                        return (
                         <FormControl as="option" key={item.nombre} value={item.nombre}>{item.nombre}</FormControl>
                    );
                    })}
                </FormControl>
              </Col>
              <Col sm={4}>
              <br></br>
                <FormLabel>Item: </FormLabel>
                <FormControl as="select" name="item" onChange={this.handleChange} value={this.state.nombre_parte} required={true}>
                {this.state.registrosItem.map((item) => {
                        return (
                         <FormControl as="option" key={item.nombre} value={item.nombre}>{item.nombre}</FormControl>
                    );
                    })}
                </FormControl>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
              <br></br>
                <FormLabel>Det_Factura</FormLabel>
                <FormControl as="select" name="det_factura" onChange={this.handleChange} value={this.state.email} required={true}>
                {this.state.registrosFact.map((item) => {
                        return (
                         <FormControl as="option" key={item.cantidad} value={item.cantidad}>{item.cantidad}</FormControl>
                    );
                    })}
                </FormControl>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={5}> </Col>
              <Col sm={2}>
                <br></br>
                <br></br>
                <Button type="submit" onClick={this.addRegistro} variant="primary" block>Guardar</Button>
                <br></br>
                <br></br>
              </Col>
              <Col sm={6}> </Col>
            </Form.Row>
          </Form>
        </Container>
      </div>
    );
  }
}
export default Factura;