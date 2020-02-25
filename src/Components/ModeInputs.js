import React, { Fragment} from 'react';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';

const ModeInputs = (props) => {
    
    const geoState = props.geoState; 

    return (
      <Fragment>
        <div className="row">
            <div className="input-field col s12">
                <input placeholder="Type a location..." id="location" type="text" className="validate" disabled={geoState} />
                <label for="location">Location</label>
            </div>
        </div>

        <div className="row">
            <div className="input-field col s12">
                <input  placeholder="Specify a radius..." id="radius" type="text" className="validate" disabled={geoState} />
                <label for="radius">Radius</label>
            </div>
            <div className="col s6 offset-s5">
                <a id="next-button" onClick={props.advance} className="waves-effect waves-light btn-large">Next</a>
            </div>
        </div>
      </Fragment>
    )
}; 

export default ModeInputs; 