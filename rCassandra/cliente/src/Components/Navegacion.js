import React from 'react';
import {Link} from 'react-router-dom';
import * as ReactBootStrap from 'react-bootstrap';
import '../CSS/NavBar.scss'

export default function NavBar(){
   return (
     <div>
       <ReactBootStrap.Navbar className="nav" variant="dark" collapseOnSelect expand="lg" >
         <Link to="/">
           <ReactBootStrap.Navbar.Brand href="/"><span className="navItem">Starbucks Coffee</span></ReactBootStrap.Navbar.Brand>
         </Link>
       <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
         <ReactBootStrap.Nav>
           <Link to="/Tabla">
             <ReactBootStrap.Nav.Link href="/Tabla"><span className="navItem">Sucursales</span></ReactBootStrap.Nav.Link>
           </Link>  
           </ReactBootStrap.Nav>
         </ReactBootStrap.Navbar.Collapse>
       </ReactBootStrap.Navbar>
     </div>
  );
}