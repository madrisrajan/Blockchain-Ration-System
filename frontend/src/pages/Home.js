import React from 'react'
import {Button} from '@material-ui/core'
import { Route, Link } from 'react-router-dom'


const Home = () => {
    return(
        <div>
            
        <Link to='/login'>
            <Button variant='contained' color='primary'>Login
            </Button>
        </Link>
        
        <br />
        <br />

        <Link to='/register'>
            <Button variant='contained' color='primary'>Register
            </Button>
        </Link>
      
        </div>
    )
}

export default Home