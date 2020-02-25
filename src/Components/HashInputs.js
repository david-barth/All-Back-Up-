import React, { Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; 
import 'materialize-css/dist/css/materialize.min.css';


const HashInputs = (props) => {
    return (
        <Fragment>
            <div className="row">
                <div className="input-field col s12">
                    <input placeholder="Enter hashtag here..." id="hashtag1" type="text" className="validate" disabled={props.hashState}/>
                    <label for="hashtag1">Hashtag Item 1:</label>
                </div>
            </div>

            <div className="row" onChange={props.toggle}>
                <div className="input-field col s12">
                    <input placeholder="Enter second hashtag here..." id="hashtag2" type="text" className="validate" disabled={props.hashState}/>
                    <label for="hashtag2">Hashtag Item 2:</label>
                </div>
            </div>
        </Fragment>
    )
}; 

export default HashInputs; 