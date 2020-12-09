import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert} from "react-bootstrap";
import './App.css';

class Bodega extends React.Component {
    constructor(props){
        super(props)
        this.state={
          nombre: "",
          capacidad: "",
          descripcion: "",
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
          nombre: this.state.nombre, 
          capacidad: this.state.capacidad,
          descripcion: this.state.descripcion,
        })
        fetch("http://localhost:3001/api/create", {
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
                <Button onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row>
          </Container>
        </div>
        );
      }
    }
 export default Bodega;