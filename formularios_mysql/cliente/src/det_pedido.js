import React from "react";
import {Container,Row,Form, FormGroup, FormControl, FormLabel, Button, Alert} from "react-bootstrap";
import './App.css';

class bodega extends React.Component {
    constructor(props){
        super(props)
        this.state={
          descripcion: "",
          capacidad: "",
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
        var cuerpo = JSON.stringify({
          descripcion: this.state.descripcion,
          capacidad: this.state.capacidad
        })
        fetch("http://localhost:3001/api/create", {
          method: "POST",
          headers: cabezales,
          body: cuerpo
        }).then((respuesta) => respuesta.json())
        .then((resultado) => {
          console.log(resultado);
          this.setState({
            descripcion: "",
            capacidad: "",
            alerta: true,
            msgAlerta: resultado.respuesta,
            tipoAlerta: "satisfactoria",
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
                  <FormLabel>Descripción</FormLabel>
                  <FormControl type="text" name="descripcion" placeholder="Ingrese la descripción" onChange={this.handleChange} value={this.state.descripcion}/>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Capacidad</FormLabel>
                  <FormControl type="text" name="capacidad" placeholder="Ingrese la capacidad de la bodega." onChange={this.handleChange} value={this.state.capacidad}/>
                </FormGroup>
                <Button onClick={this.addRegistro}>Guardar</Button>
              </Form>
            </Row>
          </Container>
        </div>
        );
      }
    }
 export default det_pedido;