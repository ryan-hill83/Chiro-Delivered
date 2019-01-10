import React, { Component } from 'react';
import axios from "axios";

class LeaveFeedback extends Component {

  state = {
    feedback: {}
  }

  handleTextBoxOnChange = e => {

    this.setState({
      newUser : {
        ...this.state.newUser,
        [e.target.name] : e.target.value
      }
    })
  }

  handleSubmitButtonClick = () => {

    let feedback = this.state.feedback

    axios.post('http://localhost:8080/leaveFeedback', {
    feedback
    })
    .then((response) => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
        <div>
          <h1>Leave Feedback</h1>
            <input type="text" name = "name" placeholder="Enter name (optional)" onChange={this.handleTextBoxOnChange} />
            <input type="text" name = "body" placeholder="type your feedback" onChange={this.handleTextBoxOnChange} />
            <button onClick={this.handleSubmitButtonClick}>Submit</button>
        </div>
    );
  }
}

export default LeaveFeedback;
