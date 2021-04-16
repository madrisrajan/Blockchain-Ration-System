import React, {Component} from 'react'
import {Container, Grid, Paper, Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state = {
        redirect : null,
    }

    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='citizens') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
        
    }
render() {
    if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return (
    <div>
        <h1>Citizen Home Page</h1>
        <Button variant='contained' color='primary'> 
            View Government Policies
        </Button>
    </div>
    )
    };
}

    export default App
