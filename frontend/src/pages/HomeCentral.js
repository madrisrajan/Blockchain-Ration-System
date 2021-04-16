import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route, Link ,Redirect} from 'react-router-dom'

class App extends Component {
    state = {
        redirect : null,
    }

    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='central_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
        
    }


    riceCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/centralgov/ricecount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

    }




    wheatCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/centralgov/wheatcount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

    }

render() {
    if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return <div>
        <h1>Central Government Home Page</h1>
        <Link to='/createfoodgrains'>
        <Button variant='contained' color='primary' >Create Food Grains</Button></Link>
        <br />
        <br />
        <Link to='/distributetostate'>
        <Button variant='contained' color='primary'>Distribute Food Grains</Button></Link>
        <br />
        <br />
         <Button 
         variant='contained' 
         color='primary'
         onClick={(this.riceCount)} 
         >
         Get Rice Count</Button>
        <br />
        <br />
         <Button variant='contained' color='primary' onClick={(this.wheatCount)} 
         >Get Wheat Count</Button>
        <br />
        <br />
        <Button variant='contained' color='primary' >View Citizen Profile</Button>
        <br />
        <br />
        <Button variant='contained' color='primary' >View Ration Shops Profile</Button>
    
        </div>
    };
}

    export default App