import React from "react";
import './App.css';
import NavBar from "./barra-nav.js";
import Cliente from "./cliente.js";
import Bodega from "./bodega.js";
import Proveedor from "./proveedor.js";
import Empleado from "./empleado.js";
import Categoria from "./categoria.js";
import Pedido from "./det_pedido.js";
import Main from "./main.js";
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
          `<Route path="/main" component={Main}>
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
