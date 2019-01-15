import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'
import './images/logo_medium.jpg'
import { withState } from 'recompose';

class Menu extends Component {

  render() {

    let authenticatedUser = [{name : 'Home', link : '/'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'Leave Feedback', link : '/leaveFeedback'}]
    let nonAuthenticatedUser = [{name : 'Home', link : '/'},{name: 'Log In', link : '/registerUser'}]
    let adminUser = [{name : 'ViewAppointments', link : '/appointments'},{name : 'Home', link : '/'},{name : 'View Users', link : '/ViewUsers'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'Leave Feedback', link : '/leaveFeedback'}]

    let MenuItem = null

    if(this.props.isAdmin){
      MenuItem = adminUser.map((item,index) => {
        return <li key = {index}><Link to = {item.link}>{item.name}</Link></li>
      })
    } else if (this.props.isAuthenticated) {
      MenuItem = authenticatedUser.map((item,index) => {
        return <li key = {index}><Link to = {item.link}>{item.name}</Link></li>
      })
    } else {
      MenuItem = nonAuthenticatedUser.map((item,index) => {
        return <li class="nav-link" key = {index}><Link style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
    })
  }

    return (
        <div className="Menu">
            <nav class="navbar navbar-expand-lg navbar-dark">
  <a class="navbar-brand" href="#"><img src={require('./images/logo_medium.jpg')} class="d-inline-block align-top" alt=""></img></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse " id="navbarNav">
    <ul class="navbar-nav ml-auto flex-nowrap">
      {MenuItem}
    </ul>
  </div>
  </nav>
          </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin,
    isAuthenticated: state.isAuthenticated
  }
}
export default connect(mapStateToProps)(Menu)
