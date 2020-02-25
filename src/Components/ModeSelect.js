import React, {Fragment, Component} from 'react';
import '../App.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';



class ModeSelect extends Component {
    
    render() {
        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Local or Global?</span>
                        <p> Select whether you wish to gather tweets from around the world ("Global Mode") or 
                        if you wish to gather tweets within a certain region ("Geographic Mode"). 
                        All Geographic Mode searches require a location and will be made within a certain radius
                        of that location. 
                        </p>
                    </div>
                    </div>
                </div>
                <div className="input-field col s6" onChange={this.props.toggle}>
                    <select defaultValue={'DEFAULT'}  ref={this.geoRef}>
                    <option value="DEFAULT" disabled>Choose your mode</option>
                    <option value="global">Global</option>
                    <option value="geographical">Geographical</option>
                    </select>
                    <label>Mode Select:</label>
                </div>
            </div>    
        )
    }
}

export default ModeSelect; 