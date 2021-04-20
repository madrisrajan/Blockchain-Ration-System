import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core/'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state : {
        rationcardnumber: "",
        profile : {},
        output : null,

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
    this.setState ({profile : res})
    console.log(this.state.profile.Name)


    //  let output = (viewcitizenprofile
    //         <div>
                
    //            <h1>name:{this.state.profile.name}</h1><br />
    //     <h1>age:{this.state.profile.age}</h1><br />
    //     <h1>address:{this.state.profile.address}</h1><br />
    //     <h1>gender:{this.state.profile.gender}</h1><br />
    //     <h1>dob:{this.state.profile.dob}</h1><br />
    //     <h1>rationcardnumber:{this.this.state.profile.rationcardnumber}</h1><br />
                
                
    //         </div>
    //  )
    
    // this.setState({ output });
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
          variant='contained' color = 'primary' onClick={this.viewcitizen}>Enter Rationcard Number</Button>
        
        <br />
        <br />
         
        <TextField disabled variant='outlined' value={this.state && this.state.profile && this.state.profile.Name}>Name </TextField><br/>
        <TextField disabled variant='outlined' value={this.state && this.state.profile && this.state.profile.DOB}>Name </TextField><br/>
        <TextField disabled variant='outlined' value={this.state && this.state.profile && this.state.profile.Address}>Name </TextField><br/>
        <TextField disabled variant='outlined' value={this.state && this.state.profile && this.state.profile.Gender}>Name </TextField><br/>
        <TextField disabled variant='outlined' value={this.state && this.state.profile && this.state.profile.ID}>Name </TextField>
        
        </div>
        
     )
          
}
}

export default App