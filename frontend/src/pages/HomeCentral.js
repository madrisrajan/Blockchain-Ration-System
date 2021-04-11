import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import {Route, Link} from 'react-router-dom'

const HomeCentral = () => {
    return <div>
        <h1>Central Government Home Page</h1>
        <Link to='/createfoodgrains'>
        <Button variant='contained' color='primary' >Create Food Grains</Button></Link>
        <br />
        <br />
        <Link to='/distributetostate'>
        <Button variant='contained' color='primary'>Distribute Food Grains</Button></Link>
        <br />
        <br />
        <Button variant='contained' color='primary' >View Citizen Profile</Button>
        <br />
        <br />
        <Button variant='contained' color='primary' >View Ration Shops Profile</Button>
    
        </div>
    };

    export default HomeCentral