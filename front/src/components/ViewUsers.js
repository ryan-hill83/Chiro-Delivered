import React, { Component } from 'react'
import axios from "axios"
const USERS_URL = 'http://localhost:8080/ViewUsers/'

class ViewUsers extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = () => {
    axios.get(USERS_URL)
    .then(res => {
      const users = res.data;
      this.setState({ users })
    })
  }

    render() {

      let allUsers = null

      allUsers = this.state.users.map((user, index) => {

        let name = `${user.firstName} ${user.lastName}`
        console.log(user)
        if(!user.isAdmin){
        return <li key={index}>
          <h3>{name}</h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </li>
        }
      })

      return (
          <div>
            {allUsers}
          </div>
      );
    }
  }

  export default ViewUsers;
