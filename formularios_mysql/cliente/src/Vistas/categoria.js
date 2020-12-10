import React from "react";
import {Container,Row,Form,FormControl,FormLabel,Button,Alert,Table,Col,bordered,striped,hover} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Categoria extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_categoria: "",
      registros: [],
      nombre: "",
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
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
    })
    fetch("http://localhost:3001/categoria/insert", {
      method: "POST",
      headers: cabezales,
      body: cuerpo
    }).then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log(resultado);
        this.setState({
          nombre: "",
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
    fetch("http://localhost:3001/categoria", {
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
      id_categoria: id,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
    });
    console.log(cuerpo);
    fetch("http://localhost:3001/categoria/update", {
      method: "PUT",
      headers: cabezales,
      body: cuerpo,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
        id_categoria: "",
        nombre: "",
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
      nombre: item.nombre,
      descripcion: item.descripcion,
    });
  }
  };

  eliminarRegistro = (id) => {
    fetch("http://localhost:3001/categoria/delete/" + id, {
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
                  <th class="align-middle">Nombre</th>
                  <th class="align-middle">Descripcion</th>
                  <th class="align-middle" colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.registros.map((item) => {
                  return (
                    <tr onClickCapture={() => this.updateInput(item)}>
                      <td class="align-middle">{item.id_categoria}</td>
                      <td class="align-middle">{item.nombre}</td>
                      <td class="align-middle">{item.descripcion}</td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                onClick={() => {this.editRegistro(item.id_categoria)}} variant="info">Actualizar</Button>
                      </td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}} 
                                onClick={() => {this.eliminarRegistro(item.id_categoria)}} variant="danger">Eliminar</Button>
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
                <FormLabel>Nombre:</FormLabel>
                <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre} required={true} />
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Descripcion:</FormLabel>
                <FormControl type="text" name="descripcion" placeholder="Ingrese el descripcion." onChange={this.handleChange} value={this.state.descripcion} required={true}></FormControl>
              </Col>
              <Col sm={2}> </Col>
              <Col sm={2}> </Col>
              <Col sm={4}>
                <br></br>
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
export default Categoria;