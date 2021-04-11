import React from 'react'
import {TextField, Button, FormControl, Select, MenuItem} from '@material-ui/core'
const Register = () => {
    return(
        <div>
             <h2>Register a new Citizen</h2>
            <br />
            <br />
            <TextField
              label='Name'
              variant='outlined'
            />
            <br />
            <br />
            <TextField
              label='Age'
              variant='outlined'
            /> 
            <br />
            <br />
            <TextField
              label='DOB'
              variant='outlined'
            />
            <br />
            <br />
            <FormControl>
              <Select>
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Address'
              variant='outlined'
            />
            
            <br />
            <br />
            <TextField
              label='Ration Card Number'
              variant='outlined'
            />
            <br />
            <br />
            <Button variant='contained' color='primary'>
                Register
            </Button>

        
        </div>
    )
}

export default Register