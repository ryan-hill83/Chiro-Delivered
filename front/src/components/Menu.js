import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'

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
        return <li key = {index}><Link to = {item.link}>{item.name}</Link></li>
    })
  }

    return (
        <div className="Menu">
            <ul className="navBar">
                {MenuItem}
            </ul>
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
