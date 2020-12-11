import React from "react";
import { Container, Image } from "react-bootstrap";
import '../Estilos/main.css';

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    //gei, super gei
    render() {
        return (
            <div className="bg">
                <h1 className="fh1">
                    BIENVENIDOS
                </h1>
            </div>
        );
    }

}

export default Main;