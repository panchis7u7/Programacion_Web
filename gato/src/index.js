import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./gato.css"

///Clase que representa al juego en general.
class Juego extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Tablero />
        </div>
      </div>
    );
  }
}

//Clase que representa un tablero de gato.
class Tablero extends React.Component {
  constructor(props) {
    super(props);
    //A primera instancia, rellena todos los recuadros con valores nulos.
    this.state = {
      cuadros: Array(9).fill(null),
      xIsNext: true,
    };
  }

  //Manejador de evento para click en la celda.
  handleClick(index){
    //Conceptop de inmutabilidad!.
    const celdas = this.state.cuadros.slice();
    if(calcularGanador(celdas) || celdas[index]) {
      return;
    }
    celdas[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      cuadros: celdas,
      xIsNext: !this.state.xIsNext,
    });
  }

  //Funcion que se encargara de renderizar cada celda basada en su index.
  renderCelda(index){
    //Imprime los turnos del jugador.
    const status = 'Siguiente jugador ' + (this.state.xIsNext ? 'X' : 'O');
    //Renderiza la celda con el respectivo indice.
    return <Celda value={this.state.cuadros[index]}
    onClick={() => {this.handleClick(index)}}
    />;
  }

  render() {
    const ganador = calcularGanador(this.state.cuadros);
    let status;
    if(ganador){
      status = 'Ganador: ' + ganador;
    } else {
      status = 'Siguiente jugador: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="fila-tablero">
          {this.renderCelda(0)}
          {this.renderCelda(1)}
          {this.renderCelda(2)}
        </div>
        <div className="fila-tablero">
          {this.renderCelda(3)}
          {this.renderCelda(4)}
          {this.renderCelda(5)}
        </div>
        <div className="fila-tablero">
          {this.renderCelda(6)}
          {this.renderCelda(7)}
          {this.renderCelda(8)}
        </div>
      </div>
    );
  }
}

function Celda(props){
  return (
    //Al hacer click en la celda, cambiara el valor del estado e imprimira su caracter respectivo.
    <button className="celda" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calcularGanador(celdas) {
  const lineas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lineas.length; i++) {
    const [a, b, c] = lineas[i];
    if (celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]) {
      return celdas[a];
    }
  }
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <Juego />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
