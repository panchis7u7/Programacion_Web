import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert, Table} from "react-bootstrap";
import  "../Estilos/Tabla.css";

class Proveedor extends React.Component {
    constructor(props){
        super(props)
        this.state={
          registros: [],
          ruc: "",
          nombre: "",
          apellido: "",
          telefono: "",
          telefono2: "",
          email: "",
          descripcion: "",
          alerta: false,
          msgAlerta: "",
          tipoAlerta: "satisfactoria",
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
          ruc: this.state.ruc,
          nombre: this.state.nombre, 
          apellido: this.state.apellido,
          telefono: this.state.telefono,
          telefono2: this.state.telefono2,
          email: this.state.email,
          descripcion: this.state.descripcion
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
            telefono: "",
            telefono2: "",
            email: "",
            descripcion: "",
            alerta: true,
            msgAlerta: resultado.respuesta,
            tipoAlerta: "satisfactoria",
          });
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


      render(){
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
              ): null}
            
            <Row>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>RUC</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono1</th>
                    <th>Telefono2</th>
                    <th>Email</th>
                    <th>Descripcion</th>
                    <th colSpan="2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.registros.map((item) => {
                    return (
                      <tr>
                        <td>{item.id_proveedor}</td>
                        <td>{item.ruc}</td>
                        <td>{item.nombre}</td> 
                        <td>{item.apellido}</td>
                        <td>{item.telefono1}</td>
                        <td>{item.telefono2}</td>
                        <td>{item.email}</td>
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
                  <FormLabel>RUC</FormLabel>
                  <FormControl type="text" name="ruc" placeholder="Ingrese el RUC" onChange={this.handleChange} value={this.state.ruc}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Nombre:</FormLabel>
                  <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre} required={true}></FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl type="text" name="apellido" placeholder="Ingrese los apellidos." onChange={this.handleChange} value={this.state.apellido}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl type="text" name="telefono" placeholder="Ingrese el telefono." onChange={this.handleChange} value={this.state.telefono}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Telefono2</FormLabel>
                  <FormControl type="text" name="telefono2" placeholder="Ingrese el telefono2." onChange={this.handleChange} value={this.state.telefono2}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Correo electronico</FormLabel>
                  <FormControl type="text" name="email" placeholder="Ingrese el correo electrónico." onChange={this.handleChange} value={this.state.email}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Descripción (opcional)</FormLabel>
                  <FormControl type="text" name="descripcion" placeholder="Ingrese la descripción." onChange={this.handleChange} value={this.state.descripcion}/>
                </FormGroup>
                <Button onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row>
          </Container>
        </div>
        );
      }
    }

 export default Proveedor;