import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.css'
import './images/logo_medium.jpg'

class Menu extends Component {

  logOut = () => {
    this.props.logOut()

    this.props.history.push('/registerUser')
  }

  render() {

    let authenticatedUser = [{name : 'Home', link : '/'},{name : 'Schedule an Appointment', link : '/appointmentCreate'},{name : 'My Appointments', link : '/MyAppointments'},{name : 'Leave Feedback', link : '/leaveFeedback'}]
    let nonAuthenticatedUser = [{name: 'Schedule an Appointment', link : '/registerUser'}]
    let adminUser = [{name : 'View Appointments', link : '/appointments'},{name : 'View Users', link : '/ViewUsers'},{ name : 'View Feedback', link: '/ViewFeedback'},{name : 'Schedule an Appointment', link : '/appointmentCreate'},{name : 'Blackout Times', link : '/BlackoutTimes'}]

    let MenuItem = null
    let LogOutButton = null

    if(this.props.isAdmin){
      LogOutButton = <button className="LogOutButton" style={{color:'white', textDecoration: 'none'}} onClick={this.logOut}>Log Out</button>
      MenuItem = adminUser.map((item,index) => {
        return <li className="nav-link" key = {index}><Link className="link" style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
      })
    } else if (this.props.isAuthenticated) {
      LogOutButton = <button className="LogOutButton" style={{color:'white', textDecoration: 'none'}} onClick={this.logOut}>Log Out</button>
      MenuItem = authenticatedUser.map((item,index) => {
        return <li className="nav-link"  key = {index}><Link className="link" style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
      })
    } else {
      MenuItem = nonAuthenticatedUser.map((item,index) => {
        return <li className="nav-link" key = {index}><Link className="link" style={{color:'white', textDecoration: 'none'}} to = {item.link}>{item.name}</Link></li>
    })
  }

    return (
        <div className="Menu">
            <nav className="navbar navbar-expand-lg navbar-dark">
  <Link className="navbar-brand" to="/"><img src={require('./images/logo_medium.jpg')} className="d-inline-block align-top navlogo" alt=""></img></Link> &nbsp; &nbsp; <p className="contact-info navbar-nav ml-auto flex-nowrap">Call Today: (630) 687-2934</p>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarNav">
    <ul className="navbar-nav ml-auto flex-nowrap">
      {MenuItem}
      {LogOutButton}
    </ul>
  </div>
  </nav>
          </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut : () => dispatch({ type : "LOG_OUT"})
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.isAdmin,
    isAuthenticated: state.isAuthenticated
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu))
