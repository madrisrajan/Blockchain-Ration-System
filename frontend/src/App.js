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
       
       <Route path='/trial' component={Trial}></Route>
       <Route path='/register' component={Register}></Route>
       <Route path='/home' component= {Home }></Route>
        <Route path='/login' component={ Login}></Route>
        <Route path='/signup' component={SignUp}></Route>
        <Route path='/history' component={History}></Route>
       <Route path='/homecentral' component={ HomeCentral}></Route>
       <Route path='/homestate' component={ HomeState}></Route>
       <Route path='/homedistrict' component={ HomeDistrict}></Route>
       <Route path='/homeration' component={ HomeRation}></Route>
       <Route path='/homecitizen' component={ HomeCitizen}></Route>
       <Route path='/newCitizen' component={ newCitizen}></Route>
       <Route path='/createfoodgrains' component={ createFoodGrains}></Route>
       <Route path='/distributetostate' component={ distributeToState}></Route>
       <Route path='/distributetodistrict' component={ distributeToDistrict }></Route>
       <Route path='/distributetoration' component={ distributeToRation}></Route>
       <Route path='/distributetocitizen' component={ distributeToCitizen}></Route>
       <Route path='/viewcitizenprofile' component={ viewCitizenProfile}></Route>



    </div>
    </Router>
  );
}

export default App;
