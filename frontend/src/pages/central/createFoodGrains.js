import React, {Component} from 'react'
import {TextField, Button, FormControl, Select, MenuItem} from '@material-ui/core'
import {Redirect} from 'react-router-dom'


class App extends Component {
    state : {
        Type : "",
        Quantity : "",
        Quality : "",
        Holder : "",

    }
    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='central_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
        
    }

    createGoodGrains = async () => {
        if(this.state){
            console.log(this.state)
        }
        this.setState({Holder: "Central Government"})
        const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            payload: JSON.stringify({
              Type : this.state.Type,
              Quantity : this.state.Quantity,
              Quality : this.state.Quality,
              Holder : "Central Government",
        }),
            user: JSON.stringify({
                username:localStorage.getItem('username'),
                group:localStorage.getItem('usergrp'),
            })

        })

    }

    let response = await fetch("http://localhost:3000/api/main/centralgov/inputgrains",requestOptions)
        let res = await response.json();
        console.log(res);
        if(res.message==="Grains have been successfully added!"){
        this.setState({ message: 'Grains added successfully' });
        }
        
    }

render() {
    if(this.state && this.state.redirect){
        return this.state.redirect
    }
    return (
        <div>
            <h2>Create Food Grains</h2>
            <br />
            
            
            <h5>Type :</h5>
            <FormControl >
                <Select onChange={(event) => {
                    this.setState({
                        Type : event.target.value,
                    }
                    )
                }}>
                    <MenuItem value='Wheat'>Wheat</MenuItem>
                    <MenuItem value='Rice'>Rice</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Quantity'
              variant='outlined'
              onChange={(event) => {
                  this.setState({
                      Quantity : event.target.value,
                  })
              }}
            /> 
            <br />
            <br />
            <TextField
              label='Quality'
              variant='outlined'
              color='primary'
              onChange={(event) => {
                  this.setState({
                      Quality : event.target.value,
                  })
              }}
            /> 
            <br />
            <br />
            <TextField
              label='Holder'
              variant='outlined'
              value='Central Government'
              disabled
            /> 
            <br />
            <br />
            
        
            <Button variant='contained' color='primary' onClick={this.createGoodGrains} >
                Register
            </Button>


               
        </div>
    )
}

}

export default App