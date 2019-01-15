import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'
import './images/logo_medium.jpg'

class Menu extends Component {

  render() {

    let authenticatedUser = [{name : 'Home', link : '/'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'My Appointments', link : '/MyAppointments'},{name : 'Leave Feedback', link : '/leaveFeedback'}]
    let nonAuthenticatedUser = [{name : 'Home', link : '/'},{name: 'Log In', link : '/registerUser'}]
    let adminUser = [{name : 'ViewAppointments', link : '/appointments'},{name : 'Home', link : '/'},{name : 'View Users', link : '/ViewUsers'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'Blackout Times', link : '/BlackoutTimes'},{ name : 'View Feedback', link: '/ViewFeedback'}]

    let MenuItem = null

    if(this.props.isAdmin){
      MenuItem = adminUser.map((item,index) => {
        return <li className="nav-link" key = {index}><Link style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
      })
    } else if (this.props.isAuthenticated) {
      MenuItem = authenticatedUser.map((item,index) => {
        return <li className="nav-link"  key = {index}><Link style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
      })
    } else {
      MenuItem = nonAuthenticatedUser.map((item,index) => {
        return <li className="nav-link" key = {index}><Link style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
    })
  }

    return (
        <div className="Menu">
            <nav className="navbar navbar-expand-lg navbar-dark">
  <a className="navbar-brand" href="#"><img src={require('./images/logo_medium.jpg')} className="d-inline-block align-top" alt=""></img></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNav">
    <ul className="navbar-nav ml-auto flex-nowrap">
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
