import React from "react";
import './App.css';
import NavBar from "./barra-nav.js";
import Cliente from "./cliente.js"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
    
    }
  };

  tbclientes = () => {
    return (<Cliente></Cliente>);
  };

  render(){ 
    return (
      <div>
        <Router>
          <NavBar></NavBar>
          <Switch>     
            <Route path="/cliente" component={Cliente}>
              <Cliente></Cliente>
            </Route>
            <Route path="/bodega" component={Cliente}>
              <Cliente></Cliente>
            </Route>
            <Route path="/cliente" component={Cliente}>
              <Cliente></Cliente>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
