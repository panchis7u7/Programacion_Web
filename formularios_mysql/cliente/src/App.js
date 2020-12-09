import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert} from "react-bootstrap";
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      nombre: "",
      apellido: "",
      alerta: false,
      msgAlerta: "",
      tipoAlerta: "satisfactoria",
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
    var cuerpo = JSON.stringify({nombre: this.state.nombre, apellido: this.state.apellido})
    fetch("http://localhost:3001/api/create", {
      method: "POST",
      headers: cabezales,
      body: cuerpo
    }).then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
      this.setState({
        nombre: "",
        apellido: "",
        alerta: true,
        msgAlerta: resultado.respuesta,
        tipoAlerta: "satisfactoria",
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
              <FormLabel>Ingrese el nombre:</FormLabel>
              <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre}></FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel>Ingrese el Apellido</FormLabel>
              <FormControl type="text" name="apellido" placeholder="Ingrese los apellidos." onChange={this.handleChange} value={this.state.apellido}/>
            </FormGroup>
            <Button onClick={this.addRegistro}>Guardar</Button>
          </Form>
        </Row>
      </Container>
    </div>
    );
  }
}

export default App;
