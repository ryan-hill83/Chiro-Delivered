import React, { Component } from 'react';
import {Link} from 'react-router-dom'


class Menu extends Component {
  render() {
    return (
        <div className="Menu">
            <ul className="navBar">
              <li><Link to = "/">Home</Link></li>
              <li><Link to = "/appointmentCreate">Schedule Appointment</Link></li>
              <li><Link to = "/leaveFeedback">Leave Feedback</Link></li>
            </ul>
          </div>
    );
  }
}

export default Menu;
