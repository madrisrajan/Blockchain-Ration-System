import React from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'

const distributeToRation = () => {
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
            <Button variant='contained'>
                Submit
            </Button>


        </div>
    )
}

export default distributeToRation