import React, { Component } from 'react';
import axios from "axios";

class LeaveFeedback extends Component {

  state = {
    feedback: {}
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
        <div className="centered">
          <h1>Leave Feedback</h1>
          <div className='feedback'>
            <input type="text" name = "name" placeholder="Enter name (optional)" onChange={this.handleTextBoxOnChange} />
            <textarea rows="4" cols="50" name = "body" placeholder="Enter your feedback" onChange={this.handleTextBoxOnChange} />
            <button onClick={this.handleSubmitButtonClick}>Submit</button>
          </div>
        </div>
    );
  }
}

export default LeaveFeedback;
