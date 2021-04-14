import React, {Component} from 'react'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import {Redirect} from 'react-router-dom'


class App extends Component {
    state : {
        group : "",
        username : "",
        password : "",
        redirect : null
    }

    

login = async () => {
    const requestOptions = {
        method : "POST",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" },
        body : JSON.stringify({
            username : this.state.username,
            password : this.state.password,
            group : this.state.group,
        })

    }

    let response =await fetch("http://127.0.0.1:3000/api/auth/login",requestOptions)
    let res = await response.json()
    console.log(res)
    if(res.status === 200){
    localStorage.setItem('user', this.state.username)
    if(this.state.group === 'citizen') this.setState ({ redirect : <Redirect to='/homecitizen' />})
    else if(this.state.group === 'centralgov') this.setState ({ redirect : <Redirect to='/homecentral' />})
    else if(this.state.group === 'stategov') this.setState ({ redirect : <Redirect to='/homestate' />})
    else if(this.state.group === 'districtoff') this.setState ({ redirect : <Redirect to='/homedistrict' />})
    else if(this.state.group === 'rationshop') this.setState ({ redirect : <Redirect to='/homeration' />})
    }else{
        this.setState ({redirect : 'wrong credential'})
        
    }


}
    
render() {
    return (
        <div>
           <h2>Login</h2>
            <FormControl
            
                  onChange={(event) => {
                      this.setState({ group : event.target.value })

                  }}
            >
                <Select>
                    <MenuItem value={'centralgov'}>Central Goverment</MenuItem>
                    <MenuItem value={'stategov'}>State Goverment</MenuItem>
                    <MenuItem value={'districtoff'}>District Office</MenuItem>
                    <MenuItem value={'rationshop'}>Ration Shop</MenuItem>
                    <MenuItem value={'citizen'}>Citizen</MenuItem>
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
               onClick={this.login}
               >
                Login
            </Button>   
            
        </div>
    )
}
}

export default App
