import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'

class Register extends Component {

  state = {
    login: true,
    newUser: {},
    message: null
  }

  toggleRegister = () => {
    let doesShow = this.state.login
    this.setState({
      login: !doesShow
    })
  }

  handleTextBoxOnChange = e => {

    this.setState({
      newUser : {
        ...this.state.newUser,
        [e.target.name] : e.target.value
      }
    })
  }

  handleLoginButtonClick = () => {

    let user = this.state.newUser

    axios.post('https://chirodelivered-server.herokuapp.com/login', {
    user
    })
    .then((response) => {
      console.log(response)
      this.setState({
        message : response.data.message
      })
      if(response.data.isAdmin){
        this.props.isAdmin()
        this.props.sendUserInfo(response.data.user)
        this.props.history.push('/appointments')
      } else if(response.data.isAuthenticated){
        this.props.isAuthenticated()
        this.props.sendUserInfo(response.data.user)
        this.props.history.push('/appointmentCreate')
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  validateEmail = () => {

    let newUser = this.state.newUser

    const regex = /[\w-]+@([\w-]+\.)+[\w-]+/
    const emailValid = regex.test(newUser.email)

    if(emailValid){
      this.validatePhone()
    } else {
      this.setState({
        message : 'Please enter a valid email...'
      })
    }
  }

  validatePhone = () => {

    let newUser = this.state.newUser

    const regex = /^\d{10,11}$/
    const phoneValid = regex.test(newUser.phone)

    if(phoneValid){
      this.validatePassword()
    } else {
      this.setState({
        message : 'Please enter a valid phone number...(10 digit number, no dashes)'
      })
    }
  }

  validatePassword = () => {

    let newUser = this.state.newUser

    const regex = /\[0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+/
    const passwordValid = regex.test(newUser.password)

    if(passwordValid){
      this.registerUser()
    } else {
      this.setState({
        message : 'Please enter a valid password...'
      })
    }
  }



  registerUser = () => {

    let newUser = this.state.newUser

    if(newUser.confirmPassword === newUser.password){
      axios.post('https://chirodelivered-server.herokuapp.com/registerUser', {
      newUser
      })
      .then((response) => {
        this.setState({
          message : response.data.message
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      this.setState({
        message : 'Your passwords do not match...'
      })
    }
    }

  render() {

    let loginOption = null

    let loginRegisterButton = null

    let message = null

    if(this.state.message){
      message = <p>{this.state.message}</p>
    }

    if(this.state.login === true){
      loginRegisterButton = <button className="loginRegisterButton" onClick={this.toggleRegister}><u>Need to register?</u></button>
    } else {
      loginRegisterButton = <button className="loginRegisterButton" onClick={this.toggleRegister}>Click to <u>Log in</u></button>
    }

    if(this.state.login === true){
      loginOption = <div className='loginRegister'>
        <h1><u>Login</u></h1>
          <div>
            <input type="email" name = "email" placeholder="Enter email" onChange={this.handleTextBoxOnChange} />
            <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter password" />
            <button onClick={this.handleLoginButtonClick}>Log In</button>
          </div>

      </div>
    } else {
      loginOption = <div className='loginRegister'>
        <h1><u>Register</u></h1>
        <div>
          <input type="email" name = "email" placeholder="Enter email" onChange={this.handleTextBoxOnChange} />
          <input type="text" name = "firstName" placeholder="Enter first name" onChange={this.handleTextBoxOnChange} />
          <input type="text" name = "lastName" placeholder="Enter last name" onChange={this.handleTextBoxOnChange} />
          <input type="text" name = "phone" placeholder="Enter phone number" onChange={this.handleTextBoxOnChange} />
          <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter password" />
          <input onChange={this.handleTextBoxOnChange} name="confirmPassword" type="password" placeholder="Reenter password" />
          <p>Password must be a minimum of eight characters, at least one letter and one number.</p>
          <button onClick={this.validateEmail}>Register</button>
        </div>

      </div>
    }

    return (
        <div className='centered'>
          {loginOption}
          {message}
          {loginRegisterButton}
        </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    isAdmin : () => dispatch({ type : "LOG_IN_ADMIN"}),
    isAuthenticated : () => dispatch({ type : "LOG_IN_USER"}),
    sendUserInfo : (user) => dispatch({ type : "SEND_USER_INFO", user : user })
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Register))


// "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

// Minimum eight characters, at least one letter and one number:
