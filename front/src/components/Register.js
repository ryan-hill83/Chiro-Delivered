import React, { Component } from 'react';

class Register extends Component {

  state = {
    login: true,
    register: false
  }

  toggleRegister = () => {
    let doesShowLogin = this.state.login
    let doesShowRegister = this.state.register
    this.setState({
      login: !doesShowLogin,
      register: !doesShowRegister
    })
  }


  render() {

    let loginOption = null

    if(this.state.login === true){
      loginOption = <div><h3>Login</h3><button onClick={this.toggleRegister}>Register</button></div>
    } else {
      loginOption = <div><h3>Register</h3><button onClick={this.toggleRegister}>log in</button></div>
    }

    return (
        <div>
          {loginOption}
        </div>
    );
  }
}

export default Register;
