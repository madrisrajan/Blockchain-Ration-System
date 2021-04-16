import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route, Link, Redirect} from 'react-router-dom'
class App extends Component {
    state = {
        redirect : null,
    }

    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!= 'district_office') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
        
    }
render() {
    if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return( 
        <div>
          <h1>District Office Home Page</h1>
          <br />
          <br />
          <Link to='/distributetoration'>
          <Button variant='contained' color='primary'>
          Distribute To Ration Shops
          </Button>
          </Link>
          <br />
          <br />

          <Button variant='contained' color='primary'>
          View Ration Shops Profile
          </Button>
          <br />
          <br />

          <Button variant='contained' color='primary'>
          View Citizen Profile
          </Button>
          <br />
          <br />
        </div>
    )
    };
}

    export default App