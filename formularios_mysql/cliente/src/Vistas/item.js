import React from "react";
import { Container, Row, Form, FormControl, FormLabel, Button, Alert, Table, Col} from "react-bootstrap";
import "../Estilos/Tabla.css";

class Empleado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_empleado: "",
            registros: [],
            cedula: "",
            nombre: "",
            apellido: "",
            telefono1: "",
            telefono2: "",
            direccion: "",
            email: "",
            cargo: "",
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
            cedula: this.state.cedula,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono1: this.state.telefono1,
            telefono2: this.state.telefono2,
            direccion: this.state.direccion,
            email: this.state.email,
            cargo: this.state.cargo,
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
                    telefono1: "",
                    telefono2: "",
                    direccion: "",
                    email: "",
                    cargo: "",
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

    editRegistro = (id) => {
        let cabezales = new Headers();
        cabezales.append("Content-Type", "application/json");
        let cuerpo = JSON.stringify({
            id_empleado: id,
            cedula: this.state.cedula,
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono1: this.state.telefono1,
            telefono2: this.state.telefono2,
            direccion: this.state.direccion,
            email: this.state.email,
            cargo: this.state.cargo,
        });
        console.log(cuerpo);
        fetch("http://localhost:3001/empleado/update", {
            method: "PUT",
            headers: cabezales,
            body: cuerpo,
        })
            .then((respuesta) => respuesta.json())
            .then((resultado) => {
                console.log(resultado);
                this.setState({
                    id_empleado: "",
                    cedula: "",
                    nombre: "",
                    apellido: "",
                    telefono1: "",
                    telefono2: "",
                    direccion: "",
                    email: "",
                    cargo: "",
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
                cedula: item.cedula,
                nombre: item.nombre,
                apellido: item.apellido,
                telefono1: item.telefono1,
                telefono2: item.telefono2,
                direccion: item.direccion,
                email: item.email,
                cargo: item.cargo,
            });
        }
    };

    eliminarRegistro = (id) => {
        fetch("http://localhost:3001/empleado/delete/" + id, {
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
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th class="align-middle">Id</th>
                                    <th class="align-middle">Cedula</th>
                                    <th class="align-middle">Nombre</th>
                                    <th class="align-middle">Apellido</th>
                                    <th class="align-middle">Telefono1</th>
                                    <th class="align-middle">Telefono2</th>
                                    <th class="align-middle">Direccion</th>
                                    <th class="align-middle">Email</th>
                                    <th class="align-middle">Cargo</th>
                                    <th class="align-middle" colSpan="2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.registros.map((item) => {
                                    return (
                                        <tr onClickCapture={() => this.updateInput(item)}>
                                            <td class="align-middle">{item.id_cliente}</td>
                                            <td class="align-middle">{item.cedula}</td>
                                            <td class="align-middle">{item.nombre}</td>
                                            <td class="align-middle">{item.apellido}</td>
                                            <td class="align-middle">{item.telefono1}</td>
                                            <td class="align-middle">{item.telefono2}</td>
                                            <td class="align-middle">{item.direccion}</td>
                                            <td class="align-middle">{item.email}</td>
                                            <td class="align-middle">{item.cargo}</td>
                                            <td class="align-middle">
                                                <Button onMouseEnter={() => { this.setState({ hoverBtn1: true }) }}
                                                    onMouseLeave={() => { this.setState({ hoverBtn1: false }) }}
                                                    onClick={() => { this.editRegistro(item.id_empleado) }} variant="info">Actualizar</Button>
                                            </td>
                                            <td class="align-middle">
                                                <Button onMouseEnter={() => { this.setState({ hoverBtn1: true }) }}
                                                    onMouseLeave={() => { this.setState({ hoverBtn1: false }) }}
                                                    onClick={() => { this.eliminarRegistro(item.id_empleado) }} variant="danger">Eliminar</Button>
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
                                <FormLabel>Cedula</FormLabel>
                                <FormControl type="text" name="cedula" placeholder="Ingrese la cedula." onChange={this.handleChange} value={this.state.cedula} />
                            </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Nombre:</FormLabel>
                                <FormControl type="text" name="nombre" placeholder="Ingrese el nombre." onChange={this.handleChange} value={this.state.nombre} required={true}></FormControl>
                            </Col>
                            <Col sm={2}> </Col>
                            <Col sm={2}> </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl type="text" name="apellido" placeholder="Ingrese los apellidos." onChange={this.handleChange} value={this.state.apellido} required={true} />
                            </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Telefono</FormLabel>
                                <FormControl type="text" name="telefono1" placeholder="Ingrese el telefono." onChange={this.handleChange} value={this.state.telefono1} required={true} />
                            </Col>
                            <Col sm={2}> </Col>
                            <Col sm={2}> </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Telefono2</FormLabel>
                                <FormControl type="text" name="telefono2" placeholder="Ingrese el telefono2." onChange={this.handleChange} value={this.state.telefono2} />
                            </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Direccion</FormLabel>
                                <FormControl type="text" name="direccion" placeholder="Ingrese la direccion." onChange={this.handleChange} value={this.state.direccion} required={true} />
                            </Col>
                            <Col sm={2}> </Col>
                            <Col sm={2}> </Col>
                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Correo electronico</FormLabel>
                                <FormControl type="text" name="email" placeholder="Ingrese el correo electrónico." onChange={this.handleChange} value={this.state.email} required={true} />
                            </Col>

                            <Col sm={4}>
                                <br></br>
                                <FormLabel>Cargo:</FormLabel>
                                <FormControl type="text" name="cargo" placeholder="Ingrese el cargo." onChange={this.handleChange} value={this.state.cargo} required={true}></FormControl>
                            </Col>

                            <Col sm={5}> </Col>
                            <Col sm={2}>
                                <br></br>
                                <br></br>
                                <Button type="submit" onClick={this.addRegistro} variant="primary" block>Guardar</Button>
                                <br></br>
                                <br></br>
                            </Col>
                            <Col sm={5}> </Col>
                        </Form.Row>
                    </Form>
                </Container>
            </div>
        );
    }
}
export default Empleado;