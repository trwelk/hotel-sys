import { Component } from "react";
import React from 'react'
import { connect } from "react-redux";
import {signIn} from '../../redux/actions/authActions/AuthActions'
import { Redirect } from "react-router-dom";
class SignIn extends Component{
    state={
        email:null,
        password:null
    }

    handleSubmit = (e) =>{
        console.log(this.state)
        e.preventDefault();
        this.props.signIn({email:this.state.email,password:this.state.password})
        if(this.props.authReducer.loginError == false)
            this.props.history.push("/")
        else if(this.props.authReducer.loginError == true)
            console.log("Log fail")

    }


    handleChange = (e) =>{
    this.setState({
        [e.target.id]:e.target.value 
    })
    }
    render(){
        const {authError,auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return(
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken">Sign In</h5>
                        <div className="input-field">
                            <label htmlFor="email" className="">Email</label>
                            <input type="email" id="email" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password" className="">Password</label>
                            <input type="password" id="password" onChange={this.handleChange}/>
                        </div>                        
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Login</button>
                            <div className="red-text center">{authError ? <p>Error in log in</p> : null}</div>
                        </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {
        //authError:state.auth.authError,
        auth:state.firebase.auth,
        authReducer:state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);