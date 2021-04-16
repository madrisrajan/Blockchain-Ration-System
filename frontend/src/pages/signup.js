import React, { Component } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import { Redirect } from "react-router-dom";
// import jwt from "../helpers/JWToken";

class App extends Component {
    state = {
        group: "",
        username: "",
        password: "",
        redirect: null,
    };

    // async componentDidMount() {
    //     if (localStorage.getItem("session")) {
    //         const requestOptions = {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json", "x-access-token": localStorage.getItem("session") },
    //         };
    //         let response = await fetch("http://localhost:3000/api/auth/verify/", requestOptions);
    //         let res = await response.json();
    //         if (res.status === 1) {
    //             if (res.group === "citizen") this.setState({ redirect: <Redirect to="/HomeCi" /> });
    //             else if (res.group === "police") this.setState({ redirect: <Redirect to="/HomePo" /> });
    //             else if (res.group === "forensics") this.setState({ redirect: <Redirect to="/HomeFo" /> });
    //             else if (res.group === "court") this.setState({ redirect: <Redirect to="/HomeCo" /> });
    //             else if (res.group === "identityprovider") this.setState({ redirect: <Redirect to="/HomeId" /> });
    //             else;
    //         }
    //         this.setState({ redirect: <Redirect to="/" /> });
    //         console.log("Login Check!");
    //     }
    // }

    signup = async () => {
        console.log(this.state.group)
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                group: this.state.group,
            }),
        };

        let response = await fetch("http://localhost:3000/api/auth/signup", requestOptions);
        let res = await response.json();
        console.log(res);
        if(res.message==='Registered successfully') this.setState({redirect : <Redirect to='/login'/>})

    };

render() {
    if(this.state && this.state.redirect){
        return this.state.redirect
    }
    return (
        <div>
           <h2>SignUp</h2>
            <FormControl
            
                  
            >
                <Select onChange={(event) => {
                      this.setState({ group : event.target.value })

                  }}>
                    <MenuItem value={'central_gov'}>Central Goverment</MenuItem>
                    <MenuItem value={'state_gov'}>State Goverment</MenuItem>
                    <MenuItem value={'district_office'}>District Office</MenuItem>
                    <MenuItem value={'ration_shops'}>Ration Shop</MenuItem>
                    <MenuItem value={'citizens'}>Citizen</MenuItem>
                </Select>
                <FormHelperText>Please choose the domain you belong to</FormHelperText>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Username'
              
              variant='outlined'
              onChange={(event) =>
                this.setState ({ 
                    username : event.target.value, 
                })
            }
            />
            <br />
            <br />

            <TextField
              label='Password'
              type='password'
              
              variant='outlined'
              onChange={(event) => 
            this.setState({
                password : event.target.value,
            })}
            />
            <br />
            <br />
            <Button 
               variant='contained'
               color='primary'
               onClick={this.signup}
               >
                Login
            </Button>   
            
        </div>
    )
}
}

export default App;