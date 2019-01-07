import React, { Component } from 'react';
import axios from "axios";

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

    axios.post('http://localhost:8080/login', {
    user
    })
    .then((response) => {
      console.log(response)
      this.setState({
        message : response.data.message
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  handleRegisterButtonClick = () => {

    let newUser = this.state.newUser

    if(newUser.confirmPassword === newUser.password){
      axios.post('http://localhost:8080/registerUser', {
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
        message : 'Your passwords do not match'
      })
    }
    }

  render() {

    let loginOption = null

    let message = null

    if(this.state.message){
      message = <p>{this.state.message}</p>
    }

    if(this.state.login === true){
      loginOption = <div>
        <h3>Login</h3>
          <div>
            <input type="email" name = "email" placeholder="Enter email" onChange={this.handleTextBoxOnChange} />
            <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter password" />
            <button onClick={this.handleLoginButtonClick}>Log In</button>
          </div>
        <button onClick={this.toggleRegister}>Register</button>
      </div>
    } else {
      loginOption = <div>
        <h3>Register</h3>
        <div>
          <input type="email" name = "email" placeholder="Enter email" onChange={this.handleTextBoxOnChange} />
          <input type="text" name = "firstName" placeholder="Enter first name" onChange={this.handleTextBoxOnChange} />
          <input type="text" name = "lastName" placeholder="Enter last name" onChange={this.handleTextBoxOnChange} />
          <input type="text" name = "phone" placeholder="Enter phone number" onChange={this.handleTextBoxOnChange} />
          <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter password" />
          <input onChange={this.handleTextBoxOnChange} name="confirmPassword" type="password" placeholder="Reenter password" />
          <button onClick={this.handleRegisterButtonClick}>Register</button>
        </div>
        <button onClick={this.toggleRegister}>log in</button>
      </div>
    }

    return (
        <div>
          {loginOption}
          {message}
        </div>
    );
  }
}

export default Register;
