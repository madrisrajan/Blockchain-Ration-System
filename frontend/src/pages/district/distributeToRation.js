import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'

class App extends Component {
    state : {
        type : "",
        quantity : "",
        quality : "",
        holder : "Ration shop",

    }

    // distributeToRation = async () => {
    //     const requestOptions = {
    //     method : "POST",
    //     headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
    //     body : JSON.stringify({
    //         payload: JSON.stringify({
    //           type : this.state.type,
    //           quantity : this.state.quantity,
    //           quality : this.state.quality,
    //           holder : this.state.holder,
    //     })
    //     })

    // }

    // let response = await fetch("http://127.0.0.1:3000/api/main/districtoff/distribute",requestOptions)
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
                District Office
            </h1>
            <h2>
                Distribute to Ration Shop
            </h2>

            <FormControl>
                <Select value='rice'>
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
              value='Ration Shop'
              disabled
              >
            </TextField>
            < br/>
            < br />
            <Button variant='contained' onClick={this.distributeToRation}>
                Submit
            </Button>


        </div>
    )
}
}

export default App