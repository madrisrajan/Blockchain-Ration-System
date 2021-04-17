import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state : {
        Type : "",
        Quantity : "",
       ricecount: "",
       wheatcount : "",

    }

    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='ration_shops') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));

          const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        }

         let response2 = await fetch("http://127.0.0.1:3000/api/main/ration/ricecount",requestOptions)
        let res2 = await response2.json();
        console.log(res2);
        this.setState({ricecount : res2}) ;

        let response1 = await fetch("http://127.0.0.1:3000/api/main/ration/wheatcount",requestOptions)
        let res1 = await response1.json();
        console.log(res1);
        this.setState({wheatcount : res1}) ;
        
    }

    distributeToCitizen = async () => {
        const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            payload: JSON.stringify({
              
              Type : this.state.Type,
              Quantity : this.state.Quantity,
           
        })
        })

    }

    let response = await fetch("http://127.0.0.1:3000/api/main/ration/inputgrains",requestOptions)
        let res = await response.json();
        console.log(res);
        if(res.succode === '1'){
        this.setState({ message: 'Grains transferred successfully' });
        }
        
    }
    render() {
         if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return ( 
        <div>
            <h1>
                Ration Shop
            </h1>
            <h2>
                Distribute to Citizen
            </h2>

            <FormControl>
                <Select onChange={(event) => {
                  this.setState({
                      Type : event.target.value
                  })
              }}>
                    <MenuItem value={'wheat'}>Wheat</MenuItem>
                    <MenuItem value={'rice'}>Rice</MenuItem>

                </Select>
            </FormControl>
            <br />
            <br/>
            

             <TextField
              
              variant='outlined'
              value={"rice: "+(this.state && this.state.ricecount)}
              disabled
              >
            </TextField>            
            < br />
            < br />
             <TextField
              disabled
              variant='outlined'
              value={"wheat: "+(this.state && this.state.wheatcount)}
              
              >
            </TextField>            
            < br />
            < br />
             <TextField
              label='Quantity'
              variant='outlined'
              required
              >
            </TextField>
<br />
<br />
             <TextField
              label='Citizen Ration card Number'
              variant='outlined'
              required
              >
            </TextField>
<br />
<br />
            <TextField
              label='Holder'
              variant='outlined'
              value='Citizen'
              disabled
              >
</TextField>
             
            < br/>
            < br />
            
            
            <Button variant='contained' onClick={this.distributeToCitizen}>
                Submit
            </Button>


        </div>
    )
}
}

export default App