import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route,Link,Redirect} from 'react-router-dom'

class App extends Component {
    state = {
        redirect : null,
    }

    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='state_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
        
    }


    getricecount = async () => {

         const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/stategov/ricecount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

    }

    wheatCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/stategov/wheatcount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

    }


render() {
    if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return (
        <div>
              <h1>State Government Home Page</h1>
          <br />
          <br />
          <Link to='/distributetodistrict'>
          <Button variant='contained' color='primary'>
          Distribute To District Offices
          </Button>
          </Link>
          <br />
          <br />
          <Button variant='contained' color='primary' onClick={this.getricecount}>
          Get Rice count
          </Button>
          <br />
          <br />
          <Button variant='contained' color='primary' onClick={this.wheatCount}>
          Get Wheat count
          </Button>
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
}
    }

    export default App