import React, {Fragment} from 'react';
import '../App.css';
import 'materialize-css/dist/css/materialize.min.css';
 


const StatDisplay = () => {
    return (
        <div class="collection">
            <a href="#!" class="collection-item">Mode: </a>
            <a href="#!" class="collection-item">Location: </a>
            <a href="#!" class="collection-item">Search Radius: </a>
            <a href="#!" class="collection-item">Search Subject: </a>
            <a href="#!" class="collection-item">Hashtag 1: </a>
            <a href="#!" class="collection-item">Hashtag 2: </a>
            <a href="#!" class="collection-item active">Individual Tweet Count: </a>
            <a href="#!" class="collection-item active">Tweet Search Count: </a>
            <a href="#!" class="collection-item active">Data Augmentation: </a>
        </div>
    )
}



export default StatDisplay; 