import React from "react";
import { Container, Row, Form, FormControl, FormLabel, Button, Alert, Table, Col, bordered, striped, hover } from "react-bootstrap";
import "../Estilos/Tabla.css";

class Factura extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_det_factura: "",
            registros: [],
            cantidad: "",
            precio_unitario: "",
            total: "",
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
            cantidad: this.state.cantidad,
            precio_unitario: this.state.precio_unitario,
            total: this.state.total,
        })
        fetch("http://localhost:3001/det_factura/insert", {
            method: "POST",
            headers: cabezales,
            body: cuerpo
        }).then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);
                this.setState({
                    cantidad: "",
                    precio_unitario: "",
                    total: "",
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
        fetch("http://localhost:3001/det_factura", {
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
        let cabezales = new Headers();
        cabezales.append("Content-Type", "application/json");
        let cuerpo = JSON.stringify({
            id_det_factura: id,
            cantidad: this.state.cantidad,
            precio_unitario: this.state.precio_unitario,
            total: this.state.total,
        });
        console.log(cuerpo);
        fetch("http://localhost:3001/det_factura/update", {
            method: "PUT",
            headers: cabezales,
            body: cuerpo,
        })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);
                this.setState({
                    id_det_factura: "",
                    cantidad: "",
                    precio_unitario: "",
                    total: "",
                    alerta: true,
                    msgAlerta: resultado.response,
                    tipoAlerta: "success",
                });
                this.fetchRegistros();
            })
            .catch((error) => console.log("error: ", error));
    };

    updateInput = (item) => {
        if (this.state.hoverBtn1 === true) {
            return;
        } else {
            this.setState({
                cantidad: this.state.cantidad,
                precio_unitario: this.state.precio_unitario,
                total: this.state.total,
            });
        }
    };

    eliminarRegistro = (id) => {
        fetch("http://localhost:3001/det_factura/delete/" + id, {
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
                        <Table striped bordered hover size="sm" >
                            <thead>
                                <tr>
                                    <th class="align-middle">Id</th>
                                    <th class="align-middle">Cantidad</th>
                                    <th class="align-middle">Precio Unitario</th>
                                    <th class="align-middle">Total</th>
                                    <th class="align-middle" colSpan="2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.registros.map((item) => {
                                    return (
                                        <tr onClickCapture={() => this.updateInput(item)}>
                                            <td class="align-middle">{item.id_det_factura}</td>
                                            <td class="align-middle">{item.cantidad}</td>
                                            <td class="align-middle">{item.precio_unitario}</td>
                                            <td class="align-middle">{item.total}</td>
                                            <td class="align-middle">
                                                <Button onMouseEnter={() => { this.setState({ hoverBtn1: true }) }}
                                                    onMouseLeave={() => { this.setState({ hoverBtn1: false }) }}
                                                    onClick={() => { this.editRegistro(item.id_det_factura) }} variant="info">Actualizar</Button>
                                            </td>
                                            <td class="align-middle">
                                                <Button onMouseEnter={() => { this.setState({ hoverBtn1: true }) }}
                                                    onMouseLeave={() => { this.setState({ hoverBtn1: false }) }}
                                                    onClick={() => { this.eliminarRegistro(item.id_det_factura) }} variant="danger">Eliminar</Button>
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
                                <FormLabel>Cantidad</FormLabel>
                                <FormControl type="text" name="cantidad" placeholder="Ingrese la cantidad." onChange={this.handleChange} value={this.state.cantidad} />
                            </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Precio Unitario</FormLabel>
                                <FormControl type="text" name="precio_unitario" placeholder="Ingrese el precio unitario." onChange={this.handleChange} value={this.state.precio_unitario} required={true}></FormControl>
                            </Col>
                            <Col sm={2}> </Col>
                            <Col sm={2}> </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Total</FormLabel>
                                <FormControl type="text" name="total" placeholder="Ingrese el total." onChange={this.handleChange} value={this.state.total} required={true} />
                            </Col>
                            <Col sm={2}> </Col>
                            <Col sm={5}> </Col>
                            <Col sm={2}>
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
export default Factura;