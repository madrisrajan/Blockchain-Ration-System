import React, {Component} from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state : {
        Type : "",
        Quantity : "",
        Holder : "",
        ricecount: "",
        wheatcount:"",

    }


    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='central_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        }

         let response2 = await fetch("http://127.0.0.1:3000/api/main/centralgov/ricecount",requestOptions)
        let res2 = await response2.json();
        console.log(res2);
        this.setState({ricecount : res2}) ;

        let response1 = await fetch("http://127.0.0.1:3000/api/main/centralgov/wheatcount",requestOptions)
        let res1 = await response1.json();
        console.log(res1);
        this.setState({wheatcount : res1}) ;
        
    }

    distributeToState = async () => {
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

    let response = await fetch("http://127.0.0.1:3000/api/main/centralgov/transfertostate",requestOptions)
        let res = await response.json();
        console.log(res);
        if(res.succode === "1"){
        this.setState({ message: 'Grains added successfully' });
        }
        
    }
    render() {
        if(this.state && this.state.redirect){
            return this.state.redirect
        }
     return ( 
        <div>
            <h1>
                Central Government
            </h1>
            <h2>
                Distribute to State
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
<br />
< br />
            <TextField
              
              variant='outlined'
              value={"wheat: "+(this.state && this.state.wheatcount)}

              disabled
              >
            </TextField>
            < br />
            <br />
            <TextField
              label='Quantity'
              variant='outlined'
              onChange={(event) => {
                  this.setState({
                      Quantity : event.target.value
                  })
              }}
              required
              >
            </TextField>
            < br/>
            < br />

            
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