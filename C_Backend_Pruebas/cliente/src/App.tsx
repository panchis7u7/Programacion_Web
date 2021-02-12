import React from 'react';
import './App.css';
import { useEffect } from 'react';

const fetchAlumnos = () => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  fetch("http://localhost:3490/prueba", {
    method: "GET",
    headers: headers,
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log("resultado: ", resultado);
  })
  .catch((error) => console.log("error: ", error));
};

const App:React.FC = () => {
  useEffect(() => {
    fetchAlumnos();
  });

  return (
    <div>
      Hola
    </div>
  );
}

export default App;