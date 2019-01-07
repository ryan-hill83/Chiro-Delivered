import React, { Component } from 'react';

class Register extends Component {

  state = {
    login: true
  }

  toggleRegister = () => {
    let doesShow = this.state.login
    this.setState({
      login: !doesShow
    })
  }


  render() {

    let loginOption = null

    if(this.state.login === true){
      loginOption = <div>
        <h3>Login</h3>
          <div>
            <input type="email" name = "email" placeholder="Enter email" onChange={this.handleTextBoxOnChange} />
            <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter password" />
            <button onClick={this.handleRegisterButtonClick}>Log In</button>
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
        </div>
    );
  }
}

export default Register;
