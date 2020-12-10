import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert, Table} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Empleado extends React.Component {
    constructor(props){
        super(props)
        this.state={
          registros: [],
          cedula: "",
          nombre: "",
          apellido: "",
          telefono: "",
          telefono2: "",
          direccion: "",
          email: "",
          cargo: "",
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
          cedula: this.state.cedula,
          nombre: this.state.nombre, 
          apellido: this.state.apellido,
          telefono: this.state.telefono,
          telefono2: this.state.telefono2,
          direccion: this.state.direccion,
          email: this.state.email,
          cargo: this.state.cargo
        })
        fetch("http://localhost:3001/empleado/insert", {
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
            telefono: "",
            telefono2: "",
            direccion: "",
            email: "",
            cargo: "",
            alerta: true,
            msgAlerta: resultado.respuesta,
            tipoAlerta: "satisfactoria",
          });
        });
      };
      
      fetchRegistros = () => {
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
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono1</th>
                    <th>Telefono2</th>
                    <th>Direccion</th>
                    <th>Email</th>
                    <th>Cargo</th>
                    <th colSpan="2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.registros.map((item) => {
                    return (
                      <tr>
                        <td>{item.id_empleado}</td>
                        <td>{item.cedula}</td>
                        <td>{item.nombre}</td> 
                        <td>{item.apellido}</td>
                        <td>{item.telefono1}</td>
                        <td>{item.telefono2}</td>
                        <td>{item.direccion}</td>
                        <td>{item.email}</td>
                        <td>{item.cargo}</td>
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
                  <FormLabel>Cedula</FormLabel>
                  <FormControl type="text" name="cedula" placeholder="Ingrese la direccion." onChange={this.handleChange} value={this.state.cedula}/>
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
                  <FormLabel>Direccion</FormLabel>
                  <FormControl type="text" name="direccion" placeholder="Ingrese la direccion." onChange={this.handleChange} value={this.state.direccion}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Correo electronico</FormLabel>
                  <FormControl type="text" name="email" placeholder="Ingrese el correo electrónico" onChange={this.handleChange} value={this.state.email}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl type="text" name="cargo" placeholder="Ingrese el cargo." onChange={this.handleChange} value={this.state.cargo}/>
                </FormGroup>
                <Button onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row>
          </Container>
        </div>
        );
      }
    }
 export default Empleado;