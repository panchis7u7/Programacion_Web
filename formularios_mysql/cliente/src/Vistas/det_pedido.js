import React from "react";
import { Container, Row, Form, FormGroup, FormControl, FormLabel, Button, Alert, Col} from "react-bootstrap";


class Pedido extends React.Component {
    constructor(props){
        super(props)
        this.state={
          descripcion: "",
          capacidad: "",
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
         
                        
                    <br></br>
                    <br></br>
                        <Form>
                            <Form.Row>
                            <br></br>
                            <Col sm={2}></Col>
                                <Col sm = {4}>
                                    <FormLabel>Descripción</FormLabel>
                                    <Form.Control type="text" name="descripcion" placeholder="Ingrese la descripción" onChange={this.handleChange} value={this.state.descripcion} />
                                </Col>
                                <Col sm={4}>
                                    <FormLabel>Capacidad</FormLabel>
                                    <Form.Control type="text" name="capacidad" placeholder="Ingrese la capacidad de la bodega." onChange={this.handleChange} value={this.state.capacidad} />
                            </Col>
                            <Col sm={2}></Col>
                            <Col sm={5}></Col>
                            <Col sm={2}>
                                <br></br>
                                <br></br>
                                    <Button onClick={this.addRegistro}>Guardar</Button>
                            </Col>
                           
                            <Col sm={5}></Col>   
                                
                            </Form.Row>
                        </Form>
            
          </Container>
        </div>
        );
      }
    }
 export default Pedido;

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