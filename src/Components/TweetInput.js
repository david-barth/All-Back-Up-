import React, { Component, Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; 
import 'materialize-css/dist/css/materialize.min.css';


const TweetInput = (props) => {
    return (
        <Fragment>
            <div className="input-field col s6">
                <input placeholder="Enter tweet subject..." id="tweetSubject" type="text" className="validate" disabled={false}/>
                <label for="tweet_Subject">Tweet Subject</label>
            </div>        

            <div className="input-field col s6" onChange={props.toggle}>
                <p>
                    <label>
                    <input 
                            name="hashtagFilter" 
                            value="option1" 
                            type="radio" 
                            checked={props.buttonState === 'option1'}
                            onChange={props.radioChoice}
                    />
                    <span>I want Hashtag Filtering</span>
                    </label>
                </p>
                <p>
                    <label>
                    <input 
                            name="general" 
                            value="option2" 
                            type="radio" 
                            checked={props.buttonState === 'option2'}
                            onChange={props.radioChoice}
                            />
                    <span>No a general search is good</span>
                    </label>
                </p>
            </div>          
        </Fragment>
    )        
}


export default TweetInput; 