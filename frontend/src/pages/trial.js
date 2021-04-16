import React, {Component} from 'react'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import {Redirect} from 'react-router-dom'


class App extends Component{
    
    render() {
        return (
            <div>
            <h1>hello</h1>
              <Redirect to='login/' />
            </div>
        
        )
    }
    }
  export default App
    