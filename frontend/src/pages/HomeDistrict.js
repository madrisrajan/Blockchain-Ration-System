import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route, Link} from 'react-router-dom'
const HomeDistrict = () => {
    return( 
        <div>
          <h1>District Office Home Page</h1>
          <br />
          <br />
          <Link to='/distributetoration'>
          <Button variant='contained' color='primary'>
          Distribute To Ration Shops
          </Button>
          </Link>
          <br />
          <br />

          <Button variant='contained' color='primary'>
          View Ration Shops Profile
          </Button>
          <br />
          <br />

          <Button variant='contained' color='primary'>
          View Citizen Profile
          </Button>
          <br />
          <br />
        </div>
    )
    };

    export default HomeDistrict