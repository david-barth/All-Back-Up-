//Main Module Imports
import React, { Fragment, component, Component } from 'react';
import {
  BrowserRouter,
  Switch, 
  Route
} from "react-router-dom";
import './App.css';
import M from 'materialize-css/dist/js/materialize.min.js'
import 'materialize-css/dist/css/materialize.min.css';

//Component Imports: 
import Nav from './Components/Nav';
import SideNav from './Components/SideNav'; 
import SearchForm from './Components/SearchForm';
import Stat from './Components/Stat'; 



class App extends Component {
  constructor () {
    super(); 

    //States:
    this.state = {
      activeComponent : null, 
    }

    //Method Bindings:
    this.componentChange = this.componentChange.bind(this);  
  }



  get initialState() {
    return {
      activeComponent: ''
    };
  }

  async componentChange(e) {
    const active = e.target.id; 
    await this.setState(this.initialState)
    this.setState((prevState) => ({
      activeComponent: prevState.activeComponent + active
    }))
  }
  //Flow of events: need to use await to asynchronously reset state so that prevState is a blank slate for further use. This strategy could be used useful for future state change considerations.
  //Note: Can use async methods in a class instance. 



  render() {
    const active = this.state.activeComponent; 
    let activePart; 

    if (active === "SearchForm") {
      activePart = <Route exact to="/search" component={() => (<SearchForm />)}/>  
    }
    else if (active === "Stat") {
      activePart = <Route exact to="/stat" component={() => (<Stat />)}/> 
    }

    return (
      <BrowserRouter>
        <Fragment>
          <Nav componentChange={this.componentChange}/>
          <SideNav />
          <Switch>
            {activePart}          
          </Switch>
        </Fragment>    
      </BrowserRouter>
      )
  }
}


export default App;


/** In reserve: 
 * <Route exact to="/stat" component={() => (<Stat />)}/>
   <Route exact to="/display" component={() => (<NewsDisplay />)}/>
 */


//Continuation: Connect conditional rendering on the App component level with the selection of the submit button within the SearchForm component. 