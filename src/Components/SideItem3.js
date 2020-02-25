import React, { Fragment } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';


const SideItem3 = () => {
    return (
        <div class="col s12 m7 blue lighten-3">
            <h4 class="header">What Happens?</h4>
            <div class="card horizontal blue lighten-1">
                <div class="card-image">
                <img src="https://ona16.journalists.org/wp-content/uploads/sites/12/2016/09/smart-news-logo.png" />
                </div>
                <div class="card-stacked">
                <div class="card-content">
                    <p>
                        This app's operation is very simple: it gathers tweets off of twitter, batches them together, feeds them to a neural network, and then uses the resulting prediction to serve news topics.
                        In a way, we can call this "smart news" because the recommended news topics will change depending on the word content of the tweets fed into the neural network. 
                        The topics are: world news, science and technology, business news, soccer news, and environmental news; all articles are gathered from The Guardian. 
                        If the gathered tweet word content reflects soccer, then soccer will be the first in your recommendations and so on. 
                        Overall, machine learning allows for a flexible and responsive approach to news recommendation. 
                    </p>
                </div>
                </div>
            </div>
        </div>
    )
}; 


export default SideItem3; 