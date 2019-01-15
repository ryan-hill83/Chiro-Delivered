import React, { Component } from 'react'
import axios from "axios"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'

const USERS_URL = 'http://localhost:8080/ViewUsers/'
const DELETE_USER_URL = 'http://localhost:8080/DeleteUsers/'

class ViewUsers extends Component {

  state = {
    users: [],
    toggleDelete: false
  }

  componentDidMount() {
    this.fetchUsers()
  }

  componentWillMount() {
    if(!this.props.isAdmin){
      this.props.history.push('/')
    }
  }

  fetchUsers = () => {
    axios.get(USERS_URL)
    .then(res => {
      const users = res.data;
      this.setState({ users })
    })
  }

  deleteUsers = (user) => {

    let UserID = user._id
    axios.post(`${DELETE_USER_URL}${UserID}`, {
      user
    })
    .then(() => {
      this.fetchUsers()
    })
  }

  toggleDeleteMenu = () => {
    let doesShow = this.state.toggleDelete
    this.setState({
      toggleDelete: !doesShow
    })
  }

    render() {

      let allUsers = null

      allUsers = this.state.users.map((user, index) => {

        let deleteMenu = null

        if(this.state.toggleDelete){
          deleteMenu = <div><p>Are you sure you wish to delete this user?</p><button onClick={()=>this.deleteUsers(user)}>Yes</button><button onClick={this.toggleDeleteMenu}>Go Back</button></div>
        }

        let name = `${user.firstName} ${user.lastName}`
        if(!user.isAdmin){
        return <li key={index}>
          <h3>{name}</h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <button onClick={this.toggleDeleteMenu}>Delete User</button>
          {deleteMenu}
        </li>
        }
      })

      return (
          <div className="centered">
            {allUsers}
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
  export default connect(mapStateToProps)(withRouter(ViewUsers))
