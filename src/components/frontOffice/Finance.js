import React, { Component } from 'react'
import { Input } from '@material-ui/core'
import FinanceHeading from './FinanceHeading'

class Finance extends Component{

    state={
        name:"trewon",
        age:21,
    }

    onCLickHandle = (e) => {
        this.setState({
            ...this.state,
            name:e.target.value
        })
    }
    render(){
        return(
        <div>
        <FinanceHeading/>
            helloooooo i am finance
            
            <p>{this.state.name}</p>
            <Input type="text" id="trewon" onChange={this.onCLickHandle}/>
        </div>

        )
    }
}

export default Finance