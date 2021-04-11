import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route,Link} from 'react-router-dom'

const HomeState = () => {
    return (
        <div>
              <h1>State Government Home Page</h1>
          <br />
          <br />
          <Link to='/distributetodistrict'>
          <Button variant='contained' color='primary'>
          Distribute To District Offices
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

    export default HomeState