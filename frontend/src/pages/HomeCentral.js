import React, {Component} from 'react'
import {Button, TextField} from '@material-ui/core'
import {Route, Link ,Redirect} from 'react-router-dom'


class App extends Component {
    state = {
        redirect : null,
        historyprofile : {},
        history : {
            TYPE : "",
            quantity : "",
            Quality : "",
            Holder : "",
        },
        message : "",
        showtable: false,
    }
    

    async componentDidMount()  {
        if (!localStorage.getItem("session") || localStorage.getItem("session")!="ok" || localStorage.getItem('usergrp')!='central_gov') this.setState({ redirect: <Redirect to="/login" /> });
        console.log(localStorage.getItem("session"));
        
    }


    riceCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/centralgov/ricecount",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState ({redirect : res})

    }




    wheatCount = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/centralgov/wheatcount",requestOptions) 
    let res = await response.json()
    console.log(res.toString())
    this.setState ({redirect : res})

    }

    gethistory = async () => {

        const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/centralgov/gethistory",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState({historyprofile : res})
    console.log(this.state.historyprofile)
    
    for(let x in this.state.historyprofile){
        let s1=""
        // this.setState({
        //     history: {
        //         TYPE : this.state.historyprofile[x].Value.TYPE
        //     }
        // })
        // this.setState({
        //     history: {
        //         quantity : this.state.historyprofile[x].Value.quantity
        //     }
        // })
        // this.setState({
        //     history: {
        //         Quality : this.state.historyprofile[x].Value.Quality
        //     }
        // })
        // this.setState({
        //     history: {
        //         Holder : this.state.historyprofile[x].Value.Holder
        //     }
        // })

        
        s1+='Quantity : '+this.state.historyprofile[x].Value.quantity+','; 
        s1+=' Quality : ' +this.state.historyprofile[x].Value.Quality+',';
        s1+=' Holder : ' +this.state.historyprofile[x].Value.Holder+",";
        s1+=' TYPE : ' +this.state.historyprofile[x].Value.TYPE+",";
        console.log(s1)
        this.setState({
            message : s1
        })
    }

    // return (
    //     <div>
    //     {this.rendertable()}
    //     </div>
    // )
    this.setState({showtable: true});
    // this.setState ({redirect : res})

    }

   renderTableData() {
      return this.state.historyprofile.map((hist, index) => {
         const { Holder, id, Quality, TYPE, quantity } = hist.Value //destructuring
         const {Timestamp} = hist
         console.log(hist);
         return (
            <tr style={{border:"1px solid black"}}key={index}>
               <td style={{border:"1px solid black"}}>{index+1}</td>
               <td style={{border:"1px solid black"}}>{TYPE}</td>
               <td style={{border:"1px solid black"}}>{quantity}</td>
               <td style={{border:"1px solid black"}}>{Quality}</td>
               <td style={{border:"1px solid black"}}>{Holder}</td>
               <td style={{border:"1px solid black"}}>{Timestamp}</td>
            </tr>
         )
      })
   }

   rendertable() {
       console.log("called")
       return (
           <table style={{width:"100%",border:"1px solid black"}} id='history'>
               <tbody >
               <tr>
               <td></td>
                 <td>TYPE</td>
                 <td>QUANTITY</td>
                 <td>QUALITY</td>
                 <td>HOLDER</td>
                 <td>TIMESTAMP</td>
               </tr>
                  {this.renderTableData()}
               </tbody>
            </table>
       )
   }    

render() {
    if(this.state && this.state.redirect){
            return this.state.redirect
        }
    return (
    <div>
        <h1>Central Government Home Page</h1>
        <Link to='/createfoodgrains'>
        <Button variant='contained' color='primary' >Create Food Grains</Button></Link>
        <br />
        <br />
        <Link to='/distributetostate'>
        <Button variant='contained' color='primary'>Distribute Food Grains</Button></Link>
        <br />
        <br />
         <Button 
         variant='contained' 
         color='primary'
         onClick={(this.riceCount)} 
         >
         Get Rice Count</Button>
        <br />
        <br />
         <Button variant='contained' color='primary' onClick={(this.wheatCount)} 
         >Get Wheat Count</Button>
        <br />
        <br />
        <Link to='/viewcitizenprofile'>
        <Button variant='contained' color='primary' >View Citizen Profile</Button>
        </Link>
        <br />
        <br />
        <Button variant='contained' color='primary' >View Ration Shops Profile</Button>
        <br />
        <br />
        <Link to='/history'>
        <Button variant='contained' color='primary'  >View History</Button>
        </Link>
        <br />
        <br />
        

        {/* <TextField variant='outlined' disabled color='primary' value={this.state.message}
        rowsMax={15}></TextField> */}

        <div>
         {this.state.showtable && this.rendertable()}
         </div>
    
        </div>
    )
    }
}

    export default App