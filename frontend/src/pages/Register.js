import React,{Component} from 'react'
import {TextField, Button, FormControl, Select, MenuItem} from '@material-ui/core'
class App extends Component {
  state : {
    profile : {
    name : "",
    age : "",
    dob : "",
    gender : "",
    address : "",
    mobilenumber: "",
    rationcardnumber : "",
    redirect : null,
  },
    message : "",
  }

  async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='citizens') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
  }

  addcitizen = async () => {

    const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payload : JSON.stringify({
                name: this.state.name,
                age: this.state.age,
                dob: this.state.dob,
                gender : this.state.gender,
                address : this.state.address,
                mobilenumber: this.state.mobilenumber,
                rationcardnumber : this.state.rationcardnumber,
              })
            }),
        };

        let response = await fetch("http://localhost:3000/api/auth/signup", requestOptions);
        let res = await response.json();
        console.log(res);
        if(res.succode==='1') this.setState({redirect : Registerd successfully})
  }

render() {
    return(
        <div>
             <h2>Register a new Citizen</h2>
            <br />
            <br />
            <TextField
              label='Name'
              variant='outlined'
              onChange={(event) =>
                
              this.setState({ 
                profile : {
                  name : event.target.value,
                },

              }) }
            />
            <br />
            <br />
            <TextField
              label='Age'
              variant='outlined'
              onChange={(event) =>
                
              this.setState({ 
                profile : {
                  age : event.target.value,
                },

              }) }
              
              
            /> 
            <br />
            <br />
            <TextField
              label='DOB'
              variant='outlined'
              onChange={(event) =>
                
              this.setState({ 
                profile : {
                  dob : event.target.value,
                },

              }) }
            />
            <br />
            <br />
            <FormControl>
              <Select onChange={(event) =>
                
              this.setState({ 
                profile : {
                  gender : event.target.value,
                },

              }) }
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Address'
              variant='outlined'
              onChange={(event) =>
                
              this.setState({ 
                profile : {
                  address : event.target.value,
                },

              }) }
            />
            
            <br />
            <br />
            <TextField
              label='Mobile Number'
              variant='outlined'
              onChange={(event) =>
                
              this.setState({ 
                profile : {
                  mobilenumber : event.target.value,
                },

              }) }
            />
            <br />
            <br />
                  <TextField
              label='Ration Card Number'
              variant='outlined'
              onChange={(event) =>
                
              this.setState({ 
                profile : {
                  rationcardnumber : event.target.value,
                },

              }) }
            />
            <br />
            <br />
            <Button variant='contained' color='primary' onClick={this.addcitizen}>
                Register
            </Button>

        
        </div>
    )
}
}


export default App