import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    Link
  } from "react-router-dom";

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

render(){
    return(
        <div className="App">
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
                <ReactBootStrap.Navbar.Brand href="#home">Tienda de Musica</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 
                        <Link to="/cliente">
                            <ReactBootStrap.Nav.Link href="/cliente">Clientes</ReactBootStrap.Nav.Link>
                        </Link>
                        <Link to="/bodega">
                            <ReactBootStrap.Nav.Link href="#bodega">Bodega</ReactBootStrap.Nav.Link>
                        </Link>
                        <ReactBootStrap.NavDropdown title="Otro" id="collasible-nav-dropdown">
                            <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <ReactBootStrap.Nav.Link to="/dir">
                            <ReactBootStrap.Nav.Link href="#dir">Otra tabla</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link to="/prueba">
                            <ReactBootStrap.Nav.Link eventKey={2} href="#prueba">Prueba</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Link>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
        );
    }
/* render(){
    return(
        <div className="App">
            <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
                <ReactBootStrap.Navbar.Brand href="#home">Tienda de Musica</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootStrap.Nav className="mr-auto"> 
                        <ReactBootStrap.Nav.Link to="/clientes">
                            <ReactBootStrap.Nav.Link href="#clientes">Clientes</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link to="/bodega">
                            <ReactBootStrap.Nav.Link href="#bodega">Bodega</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Link>
                        <ReactBootStrap.NavDropdown title="Otro" id="collasible-nav-dropdown">
                            <ReactBootStrap.NavDropdown.Item href="#action/3.1">Action</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="#action/3.2">Another action</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Item href="#action/3.3">Something</ReactBootStrap.NavDropdown.Item>
                            <ReactBootStrap.NavDropdown.Divider />
                            <ReactBootStrap.NavDropdown.Item href="#action/3.4">Separated link</ReactBootStrap.NavDropdown.Item>
                        </ReactBootStrap.NavDropdown>
                    </ReactBootStrap.Nav>
                    <ReactBootStrap.Nav>
                        <ReactBootStrap.Nav.Link to="/dir">
                            <ReactBootStrap.Nav.Link href="#dir">Otra tabla</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Link>
                        <ReactBootStrap.Nav.Link to="/prueba">
                            <ReactBootStrap.Nav.Link eventKey={2} href="#prueba">Prueba</ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav.Link>
                    </ReactBootStrap.Nav>
                </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
        </div>
    )*/
} 

export default NavBar;