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


  riceCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/district/ricecount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

    }




    wheatCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/district/wheatcount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

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
          <Button variant='contained' color='primary' onClick={(this.riceCount)}>
        Get Rice Count
    </Button>
    < br />
    < br />
    <Button variant='contained' color='primary' onClick={(this.wheatCount)}>
        Get Wheat Count
    </Button>
    < br />
    < br />

          <Link to='/viewcitizenprofile'>
        <Button variant='contained' color='primary' >View Citizen Profile</Button>
        </Link>
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