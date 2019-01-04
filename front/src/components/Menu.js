import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Menu extends Component {

  render() {

    let isAuthenticated = true
    let isAdmin = true

    let authenticatedUser = [{name : 'Home', link : '/'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'Leave Feedback', link : '/leaveFeedback'}]
    let nonAuthenticatedUser = [{name : 'Home', link : '/'},{name: 'Log In', link : '/register'}]
    let adminUser = [{name : 'ViewAppointments', link : '/appointments'},{name : 'Home', link : '/'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'Leave Feedback', link : '/leaveFeedback'}]

    let MenuItem = null

    if(isAdmin){
      MenuItem = adminUser.map((item,index) => {
        return <li key = {index}><Link to = {item.link}>{item.name}</Link></li>
      })
    } else if (isAuthenticated) {
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

export default Menu;
