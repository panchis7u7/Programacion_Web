import React from "react";
import {Container,Row,Form,FormControl,FormLabel,Button,Alert,Table,Col} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Det_pedido extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registros: [],
      id_det_pedido: "",
      descripcion: "",
      cantidad: "",
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
      descripcion: this.state.descripcion,
      cantidad: this.state.cantidad,
    })
    fetch("http://localhost:3001/det_pedido/insert", {
      method: "POST",
      headers: cabezales,
      body: cuerpo
    }).then((respuesta) => respuesta.json())
      .then((resultado) => {
        console.log(resultado);
        this.setState({
          descripcion: "",
          cantidad: "",
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
    fetch("http://localhost:3001/det_pedido", {
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
      id_det_pedido: id,
      descripcion: this.state.descripcion,
      cantidad: this.state.cantidad,
    });
    console.log(cuerpo);
    fetch("http://localhost:3001/det_pedido/update", {
      method: "PUT",
      headers: cabezales,
      body: cuerpo,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
        id_det_pedido: "",
        descripcion: "",
        cantidad: "",
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
      id_det_pedido: item.id_det_pedido,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
    });
  }
  };

  eliminarRegistro = (id) => {
    fetch("http://localhost:3001/det_pedido/delete/" + id, {
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
        <h1>Determinar pedidos</h1>
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
                  <th class="align-middle">Descripcion</th>
                  <th class="align-middle">Cantidad</th>
                  <th class="align-middle" colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.registros.map((item) => {
                  return (
                    <tr onClickCapture={() => this.updateInput(item)}>
                      <td class="align-middle">{item.id_det_pedido}</td>
                      <td class="align-middle">{item.descripcion}</td>
                      <td class="align-middle">{item.cantidad}</td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}}
                                onClick={() => {this.editRegistro(item.id_det_pedido)}} variant="info">Actualizar</Button>
                      </td>
                      <td class="align-middle">
                        <Button onMouseEnter={() => {this.setState({hoverBtn1: true})}} 
                                onMouseLeave={() => {this.setState({hoverBtn1: false})}} 
                                onClick={() => {this.eliminarRegistro(item.id_det_pedido)}} variant="danger">Eliminar</Button>
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
                <FormLabel>Descripcion</FormLabel>
                <FormControl type="text" name="descripcion" placeholder="Ingrese la descripcion." onChange={this.handleChange} value={this.state.descripcion} required={true}></FormControl>
              </Col>
              <Col sm={4}>
                <br></br>
                <FormLabel>Cantidad</FormLabel>
                <FormControl type="text" name="cantidad" placeholder="Ingrese la cantidad." onChange={this.handleChange} value={this.state.cantidad} required={true}/>
              </Col>
              <Col sm={4}> </Col>
              <Col sm={4}>
                <br></br>
                <br></br>
                <Button type="submit" onClick={this.addRegistro} variant="primary" block>Guardar</Button>
                <br></br>
                <br></br>
              </Col>
              <Col sm={4}> </Col>
              <Col sm={8}> </Col>
            </Form.Row>
          </Form>
        </Container>
      </div>
    );
  }
}
 export default Det_pedido;

            {/* <Row>
              <Form>
                <FormGroup>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl type="text" name="descripcion" placeholder="Ingrese la descripción" onChange={this.handleChange} value={this.state.descripcion}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Capacidad</FormLabel>
                  <FormControl type="text" name="capacidad" placeholder="Ingrese la capacidad de la bodega." onChange={this.handleChange} value={this.state.capacidad}/>
                </FormGroup>
                <Button onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row> */}