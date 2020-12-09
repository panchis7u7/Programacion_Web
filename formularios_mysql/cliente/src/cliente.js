import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert} from "react-bootstrap";

class Cliente extends React.Component {
    constructor(props){
        super(props)
        this.state={
          cedula: "",
          nombre: "",
          apellido: "",
          telefono: "",
          telefono2: "",
          direccion: "",
          email: "",
          alerta: false,
          msgAlerta: "",
          tipoAlerta: "success",
        };
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
        })
        fetch("http://localhost:3001/api/create", {
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
            alerta: true,
            msgAlerta: resultado.respuesta,
            tipoAlerta: "success",
          });
        });
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
                  <FormControl type="text" name="email" placeholder="Ingrese el correo electrónico." onChange={this.handleChange} value={this.state.email}/>
                </FormGroup>
                <Button onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row>
          </Container>
        </div>
        );
      }
    }
 export default Cliente;