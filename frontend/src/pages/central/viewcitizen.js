import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core/'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state : {
        rationcardnumber: "",

    }


    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='central_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));

    }

    viewcitizen = async () => {

         const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },

    }

    let response = await fetch(`http://localhost:3000/api/main/citizen/viewcitizen/${this.state.rationcardnumber}`,requestOptions) 
    let res = await response.json()
    console.log(res)
    // this.setState ({redirect : res})

    }


    render() {
        if(this.state && this.state.redirect){
            return this.state.redirect
        }
     return ( 
        <div>
          <h1>View Citizen Profile</h1>
          <br/>
          <br />
          <TextField variant='outlined'
          label=' Enter Rationcard Number'
           onChange={(event) => {
               this.setState({
                   rationcardnumber : event.target.value
               })

          }}>
         
          </TextField>
          <br />
          <br />
          <Button 
          variant='outlined' color = 'primary' onClick={this.viewcitizen}>Enter Rationcard Number</Button>
        </div>
     )
          
}
}

export default App