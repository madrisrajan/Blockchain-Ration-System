import React, {Component} from 'react'
import {TextField, Button, FormControl, Select, MenuItem} from '@material-ui/core'

class App extends Component {
    state : {
        Type : "",
        Quantity : "",
        Quality : "",
        Holder : "Central Government",

    }

    createGoodGrains = async () => {
        const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            payload: JSON.stringify({
              Type : this.state.type,
              Quantity : this.state.quantity,
              Quality : this.state.quality,
              Holder : this.state.holder,
        })
        })

    }

    let response = await fetch("http://127.0.0.1:3000/api/main/centralgov/inputgrains",requestOptions)
        let res = await response.json();
        console.log(res);
        if(res.status===200){
        this.setState({ message: 'Grains added successfully' });
        }
        
    }

render() {
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