import React from "react";
import NavBar from "./Vistas/barra-nav.js";
import Cliente from "./Vistas/cliente.js";
import Bodega from "./Vistas/bodega.js";
import Proveedor from "./Vistas/proveedor.js";
import Empleado from "./Vistas/empleado.js";
import Categoria from "./Vistas/categoria.js";
import Pedido from "./Vistas/det_pedido.js";
import Main from "./Vistas/main.js";
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
            <Route path="/det_pedido" component={Pedido}>
              <Pedido></Pedido>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
