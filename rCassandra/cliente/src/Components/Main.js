import React from 'react';
import {Container, Image} from "react-bootstrap";
import '../CSS/main.scss';

export default class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="imageBody">
                <h1>¡Ubica el Starbucks más cercano!</h1>
            </div>
        )
    };
}