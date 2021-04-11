import React, {Component} from 'react'
import {TextField, Button, FormControl, Select, MenuItem} from '@material-ui/core'

const createFoodGrains = () => {
    return (
        <div>
            <h2>Create Food Grains</h2>
            <br />
            
            
            <h5>Type :</h5>
            <FormControl>
                <Select>
                    <MenuItem >Wheat</MenuItem>
                    <MenuItem >Rice</MenuItem>
                </Select>
            </FormControl>
            <br />
            <br />
            <TextField
              label='Quantity'
              variant='outlined'
            /> 
            <br />
            <br />
            <TextField
              label='Quanlity'
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

export default createFoodGrains