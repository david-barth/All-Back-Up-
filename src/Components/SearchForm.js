import React, { Component, Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'; 
import 'materialize-css/dist/css/materialize.min.css';
import GeoSelect from './GeoSelect'; 
import HashtagFilter from './HashtagFilter'; 


class SearchForm extends Component {
    
    constructor(props) {
        super(props);

        //State Designations: 
        this.state = {
            formPart : null,
            geoState: null, 
            hashState: null, 
            radioState: 'option1',  
        };

        //Function Bindings: 
        this.initialize = this.initialize.bind(this);
        this.advanceForm = this.advanceForm.bind(this); 
        this.geoSelection = this.geoSelection.bind(this);
        this.hashSelection = this.hashSelection.bind(this); 
        this.radioChoice = this.radioChoice.bind(this); 
    }

    initialize () {
        this.setState({
            formPart: 1, 
            geoState: false,
            hashState: false
        }); 
    }

    componentDidMount() {
        this.initialize(); //Define before using the event listener. 
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        });
    }


    advanceForm () {
        this.setState({formPart: 2}); 
    }


    geoSelection(e) {
        const selection = e.target.value; 
        if (selection === 'geographical' && this.geoState) {
            this.setState((prevState) => ({
                geoState: !prevState.geoState  
              })); 
        } 
        else if (selection === 'global' && !this.geoState) {
            this.setState((prevState) => ({
                geoState: !prevState.geoState 
              })); 
        }
    } 
    //Logic: If geographical, then input must go from disabled (true) to enabled (false), vice versa


    hashSelection() {
        if (this.state.radioState === 'option1' && !this.state.hashState) {
            this.setState((prevState) => ({
                hashState: !prevState.hashState  
            })); 
        } 
        else if (this.state.radioState === 'option2' && this.state.hashState) {
            this.setState((prevState) => ({
                hashState: !prevState.hashState  
            })); 
        }
    }

    //Logic: If option1 is selected, then the hashState is false for disabled.  Vice versa applied.

    radioChoice(e) {
        this.setState({
            radioState: e.target.value
        });        
    }
    //Note: e can be used in place of other event based names for React based event handlers


    render() {
        const initialized = this.state.formPart;
        const geoState = this.state.geoState; 
        const hashState = this.state.hashState; 
        let activePart; 
        
        if (initialized === 1) {
            activePart = <GeoSelect 
                                        toggle={this.geoSelection} 
                                        geoState={geoState} 
                                        advance={this.advanceForm} 
                                        />;

        } else {
            activePart = <HashtagFilter 
                                        radioChoice={this.radioChoice} 
                                        buttonState={this.state.radioState}
                                        hashState={hashState}
                                        toggle={this.hashSelection}
                                        />;  
        }

        return (
            <div className="row">
                <form className="col s12" action="tweet_Stat.html">
                    {activePart}
                </form>
            </div>
        )
    }
}

export default SearchForm; 

//Ideas to make frontend JS work for the SearchForm component: 

    //Use conditional rendering to change which portion of the form shows up on the page. 

        //This is controlled by a true / false state in the SearchForm class component.  

        //This also simulates the style change that occurs when changing the display style in normal Javascript and HTML combinations. 

        //Using an increment / decrement conditional scheme here will allow for async changes to be applied. 


    //The idea of using 