import React, {Component} from 'react'
import './App.css';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@material-ui/core";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import bg from './background.jpg'

import Trial from './pages/trial'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SignUp from './pages/signup'
import History from './pages/History'
import HomeCentral from './pages/HomeCentral'
import HomeState from './pages/HomeState'
import HomeDistrict from './pages/HomeDistrict'
import HomeRation from './pages/HomeRation'
import HomeCitizen from './pages/HomeCitizen'
import newCitizen from './pages/citizen/newCitizen'
import createFoodGrains from './pages/central/createFoodGrains'
import distributeToState from './pages/central/distributeToState'
import distributeToDistrict from './pages/state/distributeToDistrict'
import distributeToRation from './pages/district/distributeToRation'
import distributeToCitizen from './pages/ration/distributeToCitizen'
import viewCitizenProfile from './pages/central/viewcitizen'



function App() {
  return (
    <Router>
    <div className="App" style={{height: window.innerHeight}}>
        <h1 style={{marginTop:"50px",fontWeight:"1000",fontSize:"42px",fontFamily:"serif"}}>PUBLIC DISTRIBUTION SYSTEM</h1>
       
       <Route exact path='/trial' component={Trial}></Route>
       <Route exact path='/register' component={Register}></Route>
       
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/signup' component={SignUp}></Route>
        <Route exact path='/history' component={History}></Route> 
       <Route exact path='/homecentral' component={ HomeCentral}></Route>
       <Route exact path='/homestate' component={ HomeState}></Route>
       <Route exact path='/homedistrict' component={ HomeDistrict}></Route>
       <Route exact path='/homeration' component={ HomeRation}></Route>
       <Route exact path='/homecitizen' component={ HomeCitizen}></Route>
       <Route exact path='/newCitizen' component={ newCitizen}></Route>
       <Route exact path='/createfoodgrains' component={ createFoodGrains}></Route>
       <Route exact path='/distributetostate' component={ distributeToState}></Route>
       <Route exact path='/distributetodistrict' component={ distributeToDistrict }></Route>
       <Route exact path='/distributetoration' component={ distributeToRation}></Route>
       <Route exact path='/distributetocitizen' component={ distributeToCitizen}></Route>
       <Route exact path='/viewcitizenprofile' component={ viewCitizenProfile}></Route>
       <Route exact path='/' component={ Login}></Route>



    </div>
    </Router>
  );
}

export default App;
