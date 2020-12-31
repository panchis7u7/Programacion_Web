import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import Error from './Error';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    }; 
  } 

  render() {
    return (
      <div >
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/login/welcome" component={Welcome}></Route>
            <Route path="/login/error" component={Error}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App;
