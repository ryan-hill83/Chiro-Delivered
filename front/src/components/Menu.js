import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Menu extends Component {

  render() {

    let isAuthenticated = false

    let authenticatedUser = [{name : 'Home', link : '/'},{name : 'Schedule Appointment', link : '/appointmentCreate'},{name : 'Leave Feedback', link : '/leaveFeedback'}]
    let nonAuthenticatedUser = [{name : 'Home', link : '/'},{name: 'Register', link : '/register'}]
    // let adminUser = [{name : , link : /users}]

    let MenuItem = null

    if(isAuthenticated){
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
