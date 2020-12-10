import React from "react";
import NavBar from "./Vistas/barra-nav.js";
import Cliente from "./Vistas/cliente.js";
import Bodega from "./Vistas/bodega.js";
import Proveedor from "./Vistas/proveedor.js";
import Empleado from "./Vistas/empleado.js";
import Categoria from "./Vistas/categoria.js";
import Main from "./Vistas/main.js";
import Factura from "./Vistas/factura.js"
import Det_pedido from "./Vistas/det_pedido.js"
import Det_factura from "./Vistas/det_factura.js"
import './Estilos/App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
    
    }
  };

  render(){ 
    return (
      <div>
        <Router>
          <NavBar></NavBar>
          <Switch>
          `<Route exact path="/" component={Main}>
              <Main></Main>
            </Route>     
            <Route path="/cliente" component={Cliente}>
              <Cliente></Cliente>
            </Route>
            <Route path="/bodega" component={Bodega}>
              <Bodega></Bodega>
            </Route>
            <Route path="/proveedor" component={Proveedor}>
              <Proveedor></Proveedor>
            </Route>
            <Route path="/empleado" component={Empleado}>
              <Empleado></Empleado>
            </Route>
            <Route path="/categoria" component={Categoria}>
              <Categoria></Categoria>
            </Route>
            <Route path="/det_pedido" component={Det_pedido}>
              <Det_pedido></Det_pedido>
            </Route>
            <Route path="/det_factura" component={Det_factura}>
              <Det_factura></Det_factura>
            </Route>
            <Route path="/factura" component={Factura}>
              <Factura></Factura>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
