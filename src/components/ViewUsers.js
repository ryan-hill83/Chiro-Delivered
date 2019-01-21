import React, { Component } from 'react'
import axios from "axios"
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'

const USERS_URL = 'https://chirodelivered-server.herokuapp.com/ViewUsers/'
const DELETE_USER_URL = 'https://chirodelivered-server.herokuapp.com/DeleteUsers/'

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

      let deleteMenuOption = null

      if(this.state.toggleDelete){
        deleteMenuOption = <div><p>Select a user to delete.</p><button onClick={this.toggleDeleteMenu}>Go Back</button></div>
      }

      let allUsers = null

      allUsers = this.state.users.map((user, index) => {

        let deleteMenu = null

        if(this.state.toggleDelete){
          deleteMenu = <div className="deleteMenuDiv"><p><u>Delete this user?</u></p><button onClick={()=>this.deleteUsers(user)}>Delete</button><button onClick={this.toggleDeleteMenu}>Go Back</button></div>
        }

        let name = `${user.firstName} ${user.lastName}`
        if(!user.isAdmin){
        return <li className="slotInfoDiv" key={index}>
          <h3><u>{name}</u></h3>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          {deleteMenu}
        </li>
        }
      })

      return (
          <div className="centered">
            <h1><u>Users</u></h1>
            <button className="buttonOne" onClick={this.toggleDeleteMenu}>Delete a User</button>
            {deleteMenuOption}
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
