import React from "react";
import { Container, Row, Form, FormControl, FormLabel, Button, Alert, Table, Col, bordered, striped, hover } from "react-bootstrap";
import "../Estilos/Tabla.css";

class Cliente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_cliente: "",
      registros: [],
      cedula: "",
      nombre: "",
      apellido: "",
      telefono1: "",
      telefono2: "",
      direccion: "",
      email: "",
      alerta: false,
      msgAlerta: "",
      tipoAlerta: "success",
      hoverBtn1: false,
    };
  }

  componentDidMount() {
    this.fetchRegistros();
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
      cedula: this.state.cedula,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      telefono1: this.state.telefono1,
      telefono2: this.state.telefono2,
      direccion: this.state.direccion,
      email: this.state.email,
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
    fetch("http://localhost:3001/cliente", {
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
        id_cliente: "",
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
    })
    .catch((error) => console.log("error: ", error));
  };

  updateInput = (item) => {
    if(this.state.hoverBtn1 === true){
      return;
    } else {
    this.setState({
      cedula: item.cedula,
      nombre: item.nombre,
      apellido: item.apellido,
      telefono1: item.telefono1,
      telefono2: item.telefono2,
      direccion: item.direccion,
      email: item.email,
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
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Cedula</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono1</th>
                  <th>Telefono2</th>
                  <th>Direccion</th>
                  <th>email</th>
                  <th colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.registros.map((item) => {
                  return (
                    <tr onClickCapture={() => this.updateInput(item)}>
                      <td>{item.id_cliente}</td>
                      <td>{item.cedula}</td>
                      <td>{item.nombre}</td>
                      <td>{item.apellido}</td>
                      <td>{item.telefono1}</td>
                      <td>{item.telefono2}</td>
                      <td>{item.direccion}</td>
                      <td>{item.email}</td>
                      <td>
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                onClick={() => {this.editRegistro(item.id_cliente)}} variant="info">Actualizar</Button>
                      </td>
                      <td>
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
                <FormLabel>Cedula</FormLabel>
                <FormControl type="text" name="cedula" placeholder="Ingrese la cedula." onChange={this.handleChange} value={this.state.cedula} />
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Nombre:</FormLabel>
                <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre} required={true}></FormControl>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Apellido</FormLabel>
                <FormControl type="text" name="apellido" placeholder="Ingrese los apellidos." onChange={this.handleChange} value={this.state.apellido} required={true}/>
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Telefono</FormLabel>
                <FormControl type="text" name="telefono1" placeholder="Ingrese el telefono." onChange={this.handleChange} value={this.state.telefono1} required={true}/>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Telefono2</FormLabel>
                <FormControl type="text" name="telefono2" placeholder="Ingrese el telefono2." onChange={this.handleChange} value={this.state.telefono2} />
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Direccion</FormLabel>
                <FormControl type="text" name="direccion" placeholder="Ingrese la direccion." onChange={this.handleChange} value={this.state.direccion} required={true}/>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Correo electronico</FormLabel>
                <FormControl type="text" name="email" placeholder="Ingrese el correo electrónico." onChange={this.handleChange} value={this.state.email} required={true}/>
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
export default Cliente;