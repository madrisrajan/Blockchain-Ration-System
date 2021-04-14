import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'

class App extends Component {
    state : {
        Type : "",
        Quantity : "",
        Quality : "",
        Holder : "State Government",

    }

    // distributeToState = async () => {
    //     const requestOptions = {
    //     method : "POST",
    //     headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
    //     body : JSON.stringify({
    //         payload: JSON.stringify({
    //           Type : this.state.type,
    //           Quantity : this.state.quantity,
    //           Quality : this.state.quality,
    //           Holder : this.state.holder,
    //     })
    //     })

    // }

    // let response = await fetch("http://127.0.0.1:3000/api/main/centralgov/distribute",requestOptions)
    //     let res = await response.json();
    //     console.log(res);
    //     if(res/status === 200){
    //     this.setState({ message: 'Grains added successfully' });
    //     }
        
    // }
    render() {
     return ( 
        <div>
            <h1>
                Central Government
            </h1>
            <h2>
                Distribute to State
            </h2>

            <FormControl>
                <Select >
                    <MenuItem value={'wheat'}>Wheat</MenuItem>
                    <MenuItem value={'rice'}>Rice</MenuItem>

                </Select>
            </FormControl>
            <br />
            <br/>
            <TextField
              label='Quantity'
              variant='outlined'
              required
              >
            </TextField>
            < br/>
            < br />

            <TextField
              label='Quality'
              variant='outlined'
              required
              >
            </TextField>
            < br />
            < br />

            <TextField
              label='Holder'
              variant='outlined'
              value='State'
              disabled
              >
            </TextField>
            < br/>
            < br />
            <Button variant='contained' onClick={this.distributeToState}>
                Submit
            </Button>


        </div>
    )
}
}

export default App