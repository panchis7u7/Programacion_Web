import React from 'react';
import './css/App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
    }; 
  } 

  render() {
    return (
      <div className="login-box">
        <h1>Login</h1>
        <form action="http://localhost:3001/login" method="POST">
          <label for="user">Usuario</label>
          <input value={this.state.user} onChange={this.handleChange} name="user" type="text" placeholder="Enter Username"></input>
          <label for="password">Contraseña</label>
          <input value={this.state.password} onChange={this.handleChange} name="password" type="password" placeholder="Enter Password"></input>
          <input type="submit" value="Log In" onSubmit={this.handleClick}></input>
          <a href="#">Olvidaste tu contraseña?</a><br></br>
          <a href="#">No tienes una cuenta?</a>
        </form>
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = (e) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let body = JSON.stringify({user: this.state.user, password: this.state.password});
    console.log(body);
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: headers,
      body: body,
    })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log(resultado);
    })
    .catch((err) => console.log("Error: ", err));
  };

};

export default App;
