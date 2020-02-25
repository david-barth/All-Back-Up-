import React, { Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; 
import 'materialize-css/dist/css/materialize.min.css';
import Explanation from './Explanation'; 
import TweetInput from './TweetInput'; 


const SearchSelect = (props) => {
    return (
        <div className="row">
            <Explanation /> 
            <TweetInput 
                        radioChoice={props.radioChoice} 
                        buttonState={props.buttonState}
                        toggle={props.toggle}
                        /> 
        </div>
    )
}; 

export default SearchSelect; 