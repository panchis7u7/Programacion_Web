import React from "react";
import './App.css';
import NavBar from "./barra-nav.js";
import cliente from "./cliente"
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
            <Route path="/cliente" component={cliente}>
              <cliente></cliente>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
