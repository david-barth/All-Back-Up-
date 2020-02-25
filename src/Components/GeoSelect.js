import React, {Fragment, Component} from 'react';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';
import ModeSelect from './ModeSelect'; 
import ModeInputs from './ModeInputs';



const GeoSelect = (props) => {
    return (
        <div id="section1">
            <ModeSelect toggle={props.toggle} />
            <ModeInputs advance={props.advance} geoState={props.geoState} />
        </div>
    )
}

export default GeoSelect; 