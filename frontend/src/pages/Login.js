import React, {Component} from 'react'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import {Redirect, Link} from 'react-router-dom'
import formbg from '../formbg.jpg'



class App extends Component {
    state : {
        group : "",
        username : "",
        password : "",
        redirect :null,
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

    let response =await fetch("http://localhost:3000/api/auth/login",requestOptions)
    let res = await response.json()
    console.log(res)
    
    if(res.loginsuc === '2'){
    localStorage.setItem('username', this.state.username)
    localStorage.setItem('usergrp', this.state.group)
    localStorage.setItem('session', "ok")
    
    if(this.state.group === 'citizens') this.setState ({ redirect : <Redirect to='/homecitizen' />})
    else if(this.state.group === 'central_gov') this.setState ({ redirect : <Redirect to='/homecentral' />})
    else if(this.state.group === 'state_gov')   this.setState ({ redirect : <Redirect to='/homestate' />})
    else if(this.state.group === 'district_office') this.setState ({ redirect : <Redirect to='/homedistrict' />})
    else if(this.state.group === 'ration_shops') this.setState ({ redirect : <Redirect to='/homeration' />})
    else;
    console.log(this.state.redirect)
    
    }
    else if(res.loginsuc === '1'){
        localStorage.setItem('username', this.state.username)
    localStorage.setItem('usergrp', this.state.group)
    localStorage.setItem('session', "ok")
    
       this.setState({
           redirect: <Redirect to ='./register' /> 
       })

        }
        else{
        this.setState ({redirect : 'wrong credential'})
        
    }


}
    
render() {
    if(this.state!=null && this.state.redirect!=null) {
        return this.state.redirect
    }

    
    return (
    <div style={{height:window.innerHeight,width:"100%",margin:"0px"}}>
           <h2 >Login</h2>

        <div style={{width: "800px",marginLeft:"28%",height:"350px",marginTop:"100px",boxShadow:"5px 10px 10px 5px grey",backgroundColor:"white",borderRadius:"10px 10px 10px 10px",backgroundImage:`url(${formbg})`,backgroundSize:"contain"}}>
        <div style={{display:"inline-block",height:"100%",width:"50%",float:"left"}}>
        <img src={process.env.PUBLIC_URL + 'login.png'} style={{width:"100%",height:"100%"}}/>
        </div>
         <div style={{display:"inline-block",height:"100%",width:"50%",float:"top",paddingTop:"30px"}}>
            <FormControl style={{float:"top"}}>
                <Select 
                // value = {this.state.group}
                onChange={(event) => {
                      this.setState({ group : event.target.value })

                  }}>
                    <MenuItem value={'central_gov'}>Central Goverment</MenuItem>
                    <MenuItem value={'state_gov'}>State Goverment</MenuItem>
                    <MenuItem value={'district_office'}>District Office</MenuItem>
                    <MenuItem value={'ration_shops'}>Ration Shop</MenuItem>
                    <MenuItem value={'citizens'}>Citizen</MenuItem>
                </Select>
                <FormHelperText><b>Please choose the domain you belong to</b></FormHelperText>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Username'

              
              variant='outlined'
            //   value = {this.state.username}
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

        </div>    

          <br/>
            <br/>
            <br/>
            <h4>New User ?</h4>
            <Link to='/signup'>
            <Button variant='contained' color='primary'>SignUp</Button>
            </Link>

            
            
    </div>
    )
}



}

export default App
