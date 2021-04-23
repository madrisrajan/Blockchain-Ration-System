import React, {Component} from 'react'
import {Container, Grid, Paper, Button} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

class App extends Component {
    state = {
        redirect : null,
    }

  centralhistory = async () => {


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


    statehistory = async () => {


       const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/stategov/gethistory",requestOptions) 
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


    districthistory = async () => {


       const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/district/gethistory",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState({historyprofile : res})
    console.log(this.state.historyprofile)
    
    for(let x in this.state.historyprofile){
        let s1=""
        
        s1+='Quantity : '+this.state.historyprofile[x].Value.quantity+','; 
        s1+=' Quality : ' +this.state.historyprofile[x].Value.Quality+',';
        s1+=' Holder : ' +this.state.historyprofile[x].Value.Holder+",";
        s1+=' TYPE : ' +this.state.historyprofile[x].Value.TYPE+",";
        console.log(s1)
        this.setState({
            message : s1
        })
    }

    // this.setState ({redirect : res})
    this.setState({showtable: true});

    }


    rationhistory = async () => {


       const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/ration/gethistory",requestOptions) 
    let res = await response.json()
    console.log(res)
    this.setState({historyprofile : res})
    console.log(this.state.historyprofile)
    
    for(let x in this.state.historyprofile){
        let s1=""
        
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


    citizenhistory = async () => {


       const requestOptions = {
        method : "GET",
        headers: { "Content-Type": "application/json" },headers: { "Content-Type": "application/json" }

    }

    let response = await fetch("http://localhost:3000/api/main/citizen/gethistory",requestOptions) 
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
    // if(this.state && this.state.redirect){
    //         return this.state.redirect
    //     }
    return (
    
     <div>
       <h1>View Transaction History</h1>

       

       <Button style={{display:"inline-block",alignItems:"horizontal"}} variant='contained' color='primary' onClick={this.centralhistory} >Central Government History </Button>
       <br />
       <br/>
       <Button style={{display:"inline-block"}} variant='contained' color='primary' onClick={this.statehistory}>State Government History </Button><br /><br/>
       <Button style={{display:"inline-block"}} variant='contained' color='primary' onClick={this.districthistory}>District Office History</Button><br /><br/>
       <Button style={{display:"inline-block"}} variant='contained' color='primary' onClick={this.rationhistory}> Ration Shop History</Button><br /><br/>
       <Button style={{display:"inline-block"}} variant='contained' color='primary' onClick={this.citizenhistory}>Citizen History</Button> <br /><br/>

       

        <div>
         {this.state.showtable && this.rendertable()}
         </div>
    
      </div>
    )
    };
}
export default App
