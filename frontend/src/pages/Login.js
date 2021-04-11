import React, {Component} from 'react'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";


const Login = () =>{
    return (
        <div>
           <h2>Login</h2>
            <FormControl>
                <Select value='Citizen'>
                    <MenuItem value={'centralgov'}>Central Goverment</MenuItem>
                    <MenuItem value={'stategov'}>State Goverment</MenuItem>
                    <MenuItem value={'districtoff'}>District Office</MenuItem>
                    <MenuItem value={'rationshop'}>Ration Shop</MenuItem>
                    <MenuItem value={'citizen'}>Citizen</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Username'
              variant='outlined'
            />
            <br />
            <br />

            <TextField
              label='Password'
              type='password'
              variant='outlined'
            />
            <br />
            <br />
            <Button variant='contained' color='primary'>Login</Button>   
            
        </div>
    )
}

export default Login
