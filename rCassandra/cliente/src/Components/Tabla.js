import React from 'react';
import {Container, Row, Form, FormControl, FormLabel, Button, Alert, Table, Col}  from 'react-bootstrap';

export default class Tabla extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registros: [],
            estado: "",
            ciudad: "",
            id_tienda: "",
            no_tienda: "",
            nombre: "",
            direccion: "",
            codigo_postal: "",
            longitud: "",
            latitud: "",
            alerta: false,
            msgAlerta: "",
            tipoAlerta: "success",
            hoverBtn1: false,
        };
    }
    
}