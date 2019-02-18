import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class LeaveFeedback extends Component {

  state = {
    feedback: {},
    message: ''
  }

  componentWillMount() {
    if(!this.props.isAuthenticated && !this.props.isAdmin){
      this.props.history.push('/')
    }
  }

  handleTextBoxOnChange = e => {

    this.setState({
      feedback : {
        ...this.state.feedback,
        [e.target.name] : e.target.value
      }
    })
  }

  handleSubmitButtonClick = () => {

    let feedback = this.state.feedback

    axios.post('https://chirodelivered-server.herokuapp.com/leaveFeedback', {
    feedback
    })
    .then((response) => {
      console.log(response)
      this.setState({message : response.data.message})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    let message = null

    if(this.state.message){
      message = <p className="stateMessage">{this.state.message}</p>
    }

    return (
        <div className="centered">
          <h1 className="headers">Leave Feedback</h1>
          <div className='feedback'>
            <input type="text" name = "name" placeholder="Enter Name (optional)" onChange={this.handleTextBoxOnChange} />
            <textarea rows="4" cols="50" name = "body" placeholder="Enter Your Feedback" onChange={this.handleTextBoxOnChange} />
            <button onClick={this.handleSubmitButtonClick}>Submit</button>
            {message}
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated : state.isAuthenticated,
    isAdmin : state.isAdmin
  }
}
export default connect(mapStateToProps)(withRouter(LeaveFeedback))
