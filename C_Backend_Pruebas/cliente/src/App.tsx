import React from 'react';
import MaterialTable, { Column } from 'material-table';
import './App.css';
import { useEffect, useState } from 'react';

const App:React.FC = () => {
  useEffect(() => {
    fetchAlumnos();
  }, []);

  const columnas: Column<object>[] = [
    {
      title: 'ID',
      field: 'id_alumno',
      type: 'numeric'
    },
    {
      title: 'Matricula',
      field: 'matricula',
      type: 'string'
    },
    {
      title: 'Nombre',
      field: 'nombre',
      type: 'string'
    },
    {
      title: 'Apellidos',
      field: 'apellidos',
      type: 'string'
    },
    {
      title: 'Carrera',
      field: 'carrera',
      type: 'string'
    }
];

const fetchAlumnos = () => {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  fetch("http://localhost:3490/alumnos", {
    method: "GET",
    headers: headers,
  })
    .then((respuesta) => respuesta.json())
    .then((resultado) => {
      console.log("resultado: ", resultado);
      setData(resultado);
  })
  .catch((error) => console.log("error: ", error));
};

  const [data, setData] = useState<object[]>([]);
  return (
    <div>
      <MaterialTable columns={columnas} data={data}>
      </MaterialTable>
    </div>
  );
}

export default App;