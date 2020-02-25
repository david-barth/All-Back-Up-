import React, { Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; 
import 'materialize-css/dist/css/materialize.min.css';
import SearchSelect from './SearchSelect'; 
import HashInputs from './HashInputs'; 

const HashtagFilter = (props) => {
    return (
        <div id="section2">
            <SearchSelect 
                            radioChoice={props.radioChoice} 
                            buttonState={props.buttonState}
                            toggle={props.toggle}
                            /> 
            <HashInputs 
                            hashState={props.hashState}
                            />
            <div className="row">
                <div className="col s6 offset-s5">
                    <button id="send" className="btn-large waves-effect waves-light" type="submit" name="action">Get my Tweets!
                    <i className="material-icons right">send</i>
                    </button>
                </div>
            </div>  
        </div>
    ); 
}; 

export default HashtagFilter; 