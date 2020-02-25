import React, {Fragment} from 'react';
import '../App.css';
import 'materialize-css/dist/css/materialize.min.css';
 


const StatButtons = () => {
    return (
        <div class="row">
          <div class="col s1 offset-s4">
              <a id="augment" href="tweet_Input.html" class="waves-effect waves-light btn-large">Augment!</a>
          </div>
          <div class="col s1 offset-s1">
              <a id="recommend" href="news_Display.html" class="waves-effect waves-light btn-large">Recommend!</a>
          </div>
        </div>
    )
}; 


export default StatButtons; 