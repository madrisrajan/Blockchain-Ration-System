import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route,Link} from 'react-router-dom'

const HomeRation = () => {
    return <div>
        <h1>Ration Shop Home Page</h1>
    <Link to='distributetocitizen'>
    <Button variant='contained' color='primary'>
        Distribute to Citizen
    </Button>
    </Link>
    <br />
    <br />
    <Button variant='contained' color='primary'>
        View Citizen Profile
    </Button>
    </div>
    };

    export default HomeRation