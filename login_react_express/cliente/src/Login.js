import React from 'react';
import './css/Login.css';


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        redirect: null,
        user: "",
        password: "",
    }; 
  } 

  render() {
    return (
      <div className="login-box">
        <h2>Login</h2>
        <form action="http://localhost:3001/login" method="POST">
          <label for="user">Usuario</label>
          <input value={this.state.user} onChange={this.handleChange} name="user" type="text" placeholder="Enter Username"></input>
          <label for="password">Contraseña</label>
          <input value={this.state.password} onChange={this.handleChange} name="password" type="password" placeholder="Enter Password"></input>
          <input type="button" onClick={this.handleClick} value="Log In"></input>
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
      this.setState({
          redirect: resultado.redirect,
          user: resultado.user,
      });
      this.props.history.push(`${this.state.redirect}`, {user: this.state.user});
    })
    .catch((err) => console.log("Error: ", err));
  };

};

export default Login;
