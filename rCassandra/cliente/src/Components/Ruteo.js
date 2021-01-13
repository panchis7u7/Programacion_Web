import Tabla from './Tabla';
import React from 'react';
import NavBar from './Navegacion';
import Main from './Main';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class Ruta extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  render(){
    return (
      <div>
        <Router>
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/" component={Main}>
              <Main></Main>
            </Route>
            <Route path="/Tabla" Component={Tabla}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Ruta;