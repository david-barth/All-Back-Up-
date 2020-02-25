import React, { Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';


const SideItem4 = () => {
    return (
        <div class="col s12 m7 blue lighten-3">
            <h4 class="header">An interplay of numbers and words</h4>
            <div class="card horizontal blue lighten-1">
                <div class="card-image">
                <img src="https://www.havefunteaching.com/wp-content/uploads/2013/07/number-word-flash-cards.jpg" />
                </div>
                <div class="card-stacked">
                <div class="card-content">
                    <p>
                        A neural network cannot understand words directly.  
                        Instead, it relies on words to be converted to patterns of numbers in order to intepret word content and give a reliable prediction.  
                        This app does just that; batches of tweets are converted into numbers and these numbers are fed into the neural network for prediction results. 
                        The patterning of these numbers are recognized by the neural network as patterns associated with "world news", "science and technology", "business news", "soccer news", and "environmental news". 
                        The more numbered word patterns a neural network "knows", the more flexible and responsive the predictions it can give!
                    </p>
                </div>
                </div>
            </div>
        </div>
    )
}; 


export default SideItem4; 