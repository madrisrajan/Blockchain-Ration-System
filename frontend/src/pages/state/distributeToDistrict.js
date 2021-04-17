import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state : {
        Type : "",
        Quantity : "",
        ricecount : "",
        wheatcount : "",

    }

async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='state_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));


         const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        }

         let response2 = await fetch("http://127.0.0.1:3000/api/main/stategov/ricecount",requestOptions)
        let res2 = await response2.json();
        console.log(res2);
        this.setState({ricecount : res2}) ;

        let response1 = await fetch("http://127.0.0.1:3000/api/main/stategov/wheatcount",requestOptions)
        let res1 = await response1.json();
        console.log(res1);
        this.setState({wheatcount : res1}) ;
        
    }


    distributeToDistrict = async () => {
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

    let response = await fetch("http://127.0.0.1:3000/api/main/stategov/distribute",requestOptions)
        let res = await response.json();
        console.log(res);
        if(res.succode === '1'){
        this.setState({ message: 'Grains distributed successfully from state' });
        }
        
    }
    render() {
         if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return ( 
        <div>
            <h1>
                State Government
            </h1>
            <h2>
                Distribute to District Office
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
              value={"rice: "+(this.state && this.state.ricecount)}
              variant='outlined'
              disabled
              >
            </TextField>
            < br />
            < br />
            <TextField
              value={"wheat: "+(this.state && this.state.wheatcount)}
              variant='outlined'
              disabled
              >
            </TextField>
            < br />
            < br />
            <TextField
              label='Quantity'
              variant='outlined'
              onChange={(event) => {
                  this.setState({
                      Quantity : event.target.value
                  })
              }}
              
              >
            </TextField>
            < br/>
            < br />

            <TextField
              label='Holder'
              variant='outlined'
              value='District Office'
              disabled
              >
            </TextField>
            < br/>
            < br />
            <Button variant='contained' onClick={this.distributeToDistrict}>
                Submit
            </Button>


        </div>
    )
}
}

export default App