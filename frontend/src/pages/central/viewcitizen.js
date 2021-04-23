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
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || (localStorage.getItem('usergrp')!='central_gov' && localStorage.getItem('usergrp')!='state_gov' && localStorage.getItem('usergrp')!='district_office' && localStorage.getItem('usergrp')!='ration_shops' )) this.setState({ redirect: <Redirect to="/login" /> });
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
          variant='contained' color = 'primary' onClick={this.viewcitizen}>Submit</Button>
        
        <br />
        <br />
         
       <h4>Name : {this.state && this.state.profile && this.state.profile.Name}</h4> 
        <h4>DOB : {this.state && this.state.profile && this.state.profile.DOB}</h4>
        <h4>Address : {this.state && this.state.profile && this.state.profile.Address}</h4>
        <h4>Gender : {this.state && this.state.profile && this.state.profile.Gender}</h4>
        <h4>Mobile Number : {this.state && this.state.profile && this.state.profile.MobileNumber}</h4>
        <h4>Age : {this.state && this.state.profile && this.state.profile.Age}</h4>
        
        
        </div>
        
     )
          
}
}

export default App