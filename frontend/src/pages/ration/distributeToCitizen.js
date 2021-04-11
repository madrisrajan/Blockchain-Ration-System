import React from 'react'
import {Button, FormControl, TextField, Select, MenuItem} from '@material-ui/core'

const distributeToCitizen = () => {
    return ( 
        <div>
            <h1>
                Ration Shop
            </h1>
            <h2>
                Distribute to Citizen
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
              value='Citizen'
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

export default distributeToCitizen