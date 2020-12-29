import {useEffect, useState} from 'react';
import './css/Welcome.css';

function Welcome(props) {
    const { user } = (props.location && props.location.state) || {};
    return (
        <div class="welcome-box">
            <strong>Hola</strong> {user}
        </div>
    );
}

export default Welcome;