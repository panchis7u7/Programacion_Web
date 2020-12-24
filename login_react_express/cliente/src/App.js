import {useEffect, useState} from 'react';
import './App.css';

function App(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-box">
      <h1>Login</h1>
      <form action="http://localhost:3001/login" method="POST">
        <label for="usuario">Usuario</label>
        <input value={user} onChange={(e) => setUser(e.target.value)} name="user" type="text" placeholder="Enter Username"></input>
        <label for="contrasena">Contraseña</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Enter Password"></input>
        <input type="submit" value="Log In"></input>
        <a href="#">Olvidaste tu contraseña?</a><br></br>
        <a href="#">No tienes una cuenta?</a>
      </form>
    </div>
  );
}

export default App;
