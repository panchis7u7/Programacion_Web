import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert, Table} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Bodega extends React.Component {
    constructor(props){
        super(props)
        this.state={
          registros: [],
          nombre: "",
          capacidad: "",
          descripcion: "",
          alerta: false,
          msgAlerta: "",
          tipoAlerta: "success",
        };
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
          capacidad: this.state.capacidad,
          descripcion: this.state.descripcion,
        })
        fetch("http://localhost:3001/bodega/insert", {
          method: "POST",
          headers: cabezales,
          body: cuerpo
        }).then((respuesta) => respuesta.json())
        .then((resultado) => {
          console.log(resultado);
          this.setState({
            nombre: "",
            capacidad: "",
            descripcion: "",
            alerta: true,
            msgAlerta: resultado.respuesta,
            tipoAlerta: "success",
          });
        });
      };
      
      fetchRegistros = () => {
        let cabezales = new Headers();
        cabezales.append("Content-Type", "application/json");
        fetch("http://localhost:3001/bodega", {
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

      render(){
        return (
        <div>
          <Container className="mh-auto">
            {
              this.state.alerta === true ? (
              <Alert variant={this.state.tipoAlerta} onClose={() => {
                this.setState({
                  alerta: false,
                })
              }} dismissible>
                <Alert.Heading>{this.state.msgAlerta}</Alert.Heading>
              </Alert>
              ): null}
            <Row>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Capacidad</th>
                    <th>Descripcion</th>
                    <th colSpan="2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.registros.map((item) => {
                    return (
                      <tr>
                        <td>{item.id_bodega}</td>
                        <td>{item.nombre}</td> 
                        <td>{item.cargo}</td>
                        <td>{item.descripcion}</td>
                        <td>
                          <Button variant="info">Actualizar</Button>
                        </td>
                        <td>
                          <Button variant= "danger">Eliminar</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody> 
              </Table>
            </Row>

            <Row>
              <Form>
                <FormGroup>
                  <FormLabel>Nombre:</FormLabel>
                  <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre} required={true}></FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Capacidad</FormLabel>
                  <FormControl type="text" name="capacidad" placeholder="Ingrese la capacidad de la bodega." onChange={this.handleChange} value={this.state.capacidad}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl type="text" name="descripcion" placeholder="Ingrese la descripción" onChange={this.handleChange} value={this.state.descripcion}/>
                </FormGroup>
                <Button type="Submit" onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row>
          </Container>
        </div>
        );
      }
    }
 export default Bodega;