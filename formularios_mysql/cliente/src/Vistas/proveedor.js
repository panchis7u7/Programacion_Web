import React from "react";
import {Container,Row,Form,FormControl,FormLabel,Button,Alert,Table,Col,bordered,striped,hover} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Proveedor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_proveedor: "",
      registros: [],
      ruc: "",
      nombre: "",
      apellido: "",
      telefono1: "",
      telefono2: "",
      email: "",
      descripcion: "",
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
      ruc: this.state.ruc,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      telefono1: this.state.telefono1,
      telefono2: this.state.telefono2,
      email: this.state.email,
      descripcion: this.state.descripcion,
    })
    fetch("http://localhost:3001/proveedor/insert", {
      method: "POST",
      headers: cabezales,
      body: cuerpo
    }).then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log(resultado);
        this.setState({
          ruc: "",
          nombre: "",
          apellido: "",
          telefono1: "",
          telefono2: "",
          email: "",
          descripcion: "",
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
    fetch("http://localhost:3001/proveedor", {
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
      id_proveedor: id,
      ruc: this.state.cedula,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      telefono1: this.state.telefono1,
      telefono2: this.state.telefono2,
      email: this.state.email,
      descripcion: this.state.descripcion,
    });
    console.log(cuerpo);
    fetch("http://localhost:3001/proveedor/update", {
      method: "PUT",
      headers: cabezales,
      body: cuerpo,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
        id_proveedor: "",
        ruc: "",
        nombre: "",
        apellido: "",
        telefono1: "",
        telefono2: "",
        email: "",
        descripcion: "",
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
      ruc: item.ruc,
      nombre: item.nombre,
      apellido: item.apellido,
      telefono1: item.telefono1,
      telefono2: item.telefono2,
      email: item.email,
      descripcion: item.descripcion,
    });
  }
  };

  eliminarRegistro = (id) => {
    fetch("http://localhost:3001/proveedor/delete/" + id, {
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
                  <th class="align-middle">Id</th>
                  <th class="align-middle">RUC</th>
                  <th class="align-middle">Nombre</th>
                  <th class="align-middle">Apellido</th>
                  <th class="align-middle">Telefono1</th>
                  <th class="align-middle">Telefono2</th>
                  <th class="align-middle">Email</th>
                  <th class="align-middle">Descripcion</th>
                  <th class="align-middle" colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.registros.map((item) => {
                  return (
                    <tr onClickCapture={() => this.updateInput(item)}>
                      <td class="align-middle">{item.id_proveedor}</td>
                      <td class="align-middle">{item.ruc}</td>
                      <td class="align-middle">{item.nombre}</td>
                      <td class="align-middle">{item.apellido}</td>
                      <td class="align-middle">{item.telefono1}</td>
                      <td class="align-middle">{item.telefono2}</td>
                      <td class="align-middle">{item.email}</td>
                      <td class="align-middle">{item.descripcion}</td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                onClick={() => {this.editRegistro(item.id_proveedor)}} variant="info">Actualizar</Button>
                      </td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}} 
                                onClick={() => {this.eliminarRegistro(item.id_proveedor)}} variant="danger">Eliminar</Button>
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
                <FormLabel>RUC</FormLabel>
                <FormControl type="text" name="ruc" placeholder="Ingrese la RUC." onChange={this.handleChange} value={this.state.ruc} />
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
                <FormLabel>Correo electronico</FormLabel>
                <FormControl type="text" name="email" placeholder="Ingrese el correo electronico." onChange={this.handleChange} value={this.state.email} required={true}/>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Descripcion</FormLabel>
                <FormControl type="text" name="descripcion" placeholder="Ingrese la descripcion." onChange={this.handleChange} value={this.state.descripcion}/>
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
export default Proveedor;