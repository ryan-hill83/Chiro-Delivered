import React, { Component } from 'react'
import axios from "axios"
const FEEDBACK_URL = 'http://localhost:8080/getFeedback/'

class ViewFeedback extends Component {

  state = {
    feedback: []
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = () => {
    axios.get(FEEDBACK_URL)
    .then(res => {
      const feedback = res.data;
      this.setState({ feedback })
    })
  }

    render() {

      let allPosts = null

      allPosts = this.state.feedback.map((post, index) => {

        return <li key={index}>
          <h3>{post.name}</h3>
          <p>{post.body}</p>
        </li>
      })

      return (
          <div>
            {allPosts}
          </div>
      );
    }
  }

  export default ViewFeedback;
