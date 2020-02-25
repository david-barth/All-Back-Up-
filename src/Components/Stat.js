import React, {Fragment} from 'react';
import '../App.css';
import 'materialize-css/dist/css/materialize.min.css';
import StatExplanation from './StatExplanation'; 
import StatDisplay from './StatDisplay';
import StatButtons from './StatButtons';  

const Stat = () => {
    
    return (
        <Fragment>
            <div class="row">
                <StatExplanation />
                <StatDisplay />
            </div>
            <StatButtons /> 
        </Fragment>
    )
}



export default Stat; 