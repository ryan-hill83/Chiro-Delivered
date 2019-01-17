import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './style.css'


const APPOINTMENT_URL = 'https://chirodelivered-server.herokuapp.com/appointments'
const CONFIRMED_SLOT_URL = 'https://chirodelivered-server.herokuapp.com/retrieveConfirmedSlots'
const UNCONFIRMED_SLOT_URL = 'https://chirodelivered-server.herokuapp.com/retrieveUnconfirmedSlots'
const OLD_SLOT_URL = 'https://chirodelivered-server.herokuapp.com/retrieveOldSlots'
const CONFIRM_URL = 'https://chirodelivered-server.herokuapp.com/confirmAppointment/'
const DENY_URL = 'https://chirodelivered-server.herokuapp.com/denyAppointment/'
const DELETE_OLD_URL = 'https://chirodelivered-server.herokuapp.com/DeleteOld'
const DELETE_URL = 'https://chirodelivered-server.herokuapp.com/deleteAppointment/'


let unconfirmedSlotArr = []
let oldSlotArr = []

class ViewAppointments extends Component {

  state = {
    appointments: [],
    confirmedSlots: [],
    unconfirmedSlots: [],
    oldSlots: [],
    deleteMenu: false,
    deleteOneMenu: false
  }

  componentDidMount() {
    this.fetchAppointments()
  }

  componentWillMount() {
    if(!this.props.isAdmin){
      this.props.history.push('/')
    }
  }

  fetchAppointments = () => {
    axios.get(APPOINTMENT_URL)
    .then(res => {
      const appointments = res.data;
      this.setState({ appointments })
    })

    axios.get(UNCONFIRMED_SLOT_URL)
    .then(res => {
      const uSlots = res.data;
      this.setState({ unconfirmedSlots: uSlots })
    })

    axios.get(CONFIRMED_SLOT_URL)
    .then(res => {
      const slots = res.data;
      this.setState({ confirmedSlots: slots })
    })

    axios.get(OLD_SLOT_URL)
    .then(res => {
      const oSlots = res.data;
      this.setState({ oldSlots: oSlots })
    })
  }


  confirmAppointment = (data, slot) => {

    let slotId = data.appointment.slots

    axios.put(`${CONFIRM_URL}${slotId}`, {
      data, slot
    })
    .then(res => {
      const response = res.data;
      this.fetchAppointments()
    })
  }

  denyAppointment = (data, slot) => {

    let slotId = data.appointment.slots

    axios.put(`${DENY_URL}${slotId}`, {
      data, slot
    })
    .then(res => {
      const response = res.data;
      this.fetchAppointments()
    })
  }

  DeleteOld = (oldSlots) => {

    axios.post(DELETE_OLD_URL, {
      oldSlots
    })
    .then(res => {
      const response = res.data;
      this.toggleDeleteAllOption()
      this.fetchAppointments()
    })
  }

  toggleDeleteAllOption = () => {
    let doesShow = this.state.deleteMenu
    this.setState({
      deleteMenu: !doesShow
    })
  }

  toggleDeleteOneOption = () => {
    let doesShow = this.state.deleteOneMenu
    this.setState({
      deleteOneMenu: !doesShow
    })
  }

  deleteOne = (data) => {

    let slotId = data.slots

    axios.put(`${DELETE_URL}${slotId}`)
    .then(res => {
      const response = res.data;
      this.toggleDeleteOneOption()
      this.fetchAppointments()
    })
  }

  render() {

    Array.prototype.groupBy = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }


    let unconfirmedGroupedByDate = this.state.unconfirmedSlots.groupBy('slot_date')

    let unconfirmedSlotDate = null

    unconfirmedSlotDate = Object.keys(unconfirmedGroupedByDate).sort().map((key, index) => {

      let slots = unconfirmedGroupedByDate[key]

      let sortedSlots = slots.sort(function(a, b){return a.slot_time - b.slot_time})

      let slotItems = sortedSlots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '0.5':
            slot_time = '9:30 am'
            break;
          case '1':
            slot_time = '10 am'
            break;
          case '1.5':
            slot_time = '10:30 am'
            break;
          case '2':
            slot_time = '11 am'
            break;
          case '2.5':
            slot_time = '11:30 am'
            break;
          case '3':
            slot_time = '12 pm'
            break;
          case '3.5':
            slot_time = '12:30 pm'
            break;
          case '4':
            slot_time = '1 pm'
            break;
          case '4.5':
            slot_time = '1:30 pm'
            break;
          case '5':
            slot_time = '2 pm'
            break;
          case '5.5':
            slot_time = '2:30 pm'
            break;
          case '6':
            slot_time = '3 pm'
            break;
          case '6.5':
            slot_time = '3:30 pm'
            break;
          case '7':
            slot_time = '4 pm'
            break;
          case '7.5':
            slot_time = '4:30 pm'
            break;
          case '8':
            slot_time = '5 pm'
            break;
          case '8.5':
            slot_time = '5:30 pm'
            break;
          }

          let appointments = this.state.appointments.map((appointment, index) => {

            let deleteOneMenu = null

            if(this.state.deleteOneMenu){
              deleteOneMenu = <div className="deleteMenuDiv"><p><u>Delete this appointment?</u></p>

              <button onClick={()=>this.deleteOne(appointment)}>Delete</button><button onClick={this.toggleDeleteOneOption}>Go back</button></div>
            }

            if(slot._id === appointment.slots){
              return <li className="appointmentInfoLi" key={index + 100}>
                <p>{appointment.name}</p>
                <p>{appointment.phone}</p>
                <p>{appointment.email}</p>
                <p>{appointment.address}</p>
                <button onClick={()=>this.confirmAppointment({appointment},{slot})}>Confirm</button>
                {deleteOneMenu}
              </li>
              }
            })

        let x = <div className="slotInfoDiv" key={index}>
              <h5>{slot_time}</h5>
            <ul className="appointmentSlotUl">{appointments}</ul></div>

              return x


      })

      return <li className="slotInfoDiv" key={index}>
        <h4><u>{key}</u></h4>
        <ul className="appointmentSlotUl">
          {slotItems}
          </ul>
      </li>

    })

    let confirmedSlotLi = null

    let groupedByDate = this.state.confirmedSlots.groupBy('slot_date')

    confirmedSlotLi = Object.keys(groupedByDate).sort().map((key, index) => {

      let slots = groupedByDate[key]

      // console.log(key)

      let sortedSlots = slots.sort(function(a, b){return a.slot_time - b.slot_time})

      let slotItems = sortedSlots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '0.5':
            slot_time = '9:30 am'
            break;
          case '1':
            slot_time = '10 am'
            break;
          case '1.5':
            slot_time = '10:30 am'
            break;
          case '2':
            slot_time = '11 am'
            break;
          case '2.5':
            slot_time = '11:30 am'
            break;
          case '3':
            slot_time = '12 pm'
            break;
          case '3.5':
            slot_time = '12:30 pm'
            break;
          case '4':
            slot_time = '1 pm'
            break;
          case '4.5':
            slot_time = '1:30 pm'
            break;
          case '5':
            slot_time = '2 pm'
            break;
          case '5.5':
            slot_time = '2:30 pm'
            break;
          case '6':
            slot_time = '3 pm'
            break;
          case '6.5':
            slot_time = '3:30 pm'
            break;
          case '7':
            slot_time = '4 pm'
            break;
          case '7.5':
            slot_time = '4:30 pm'
            break;
          case '8':
            slot_time = '5 pm'
            break;
          case '8.5':
            slot_time = '5:30 pm'
            break;
          }

          let appointments = this.state.appointments.map((appointment, index) => {

            let deleteOneMenu = null

            if(this.state.deleteOneMenu){
              deleteOneMenu = <div className="deleteMenuDiv"><p><u>Delete this appointment?</u></p>

              <button onClick={()=>this.deleteOne(appointment)}>Delete</button><button onClick={this.toggleDeleteOneOption}>Go back</button></div>
            }

            if(slot._id === appointment.slots){
              return <li className="appointmentInfoLi" key={index + 100}>
                <p>{appointment.name}</p>
                <p>{appointment.phone}</p>
                <p>{appointment.email}</p>
                <p>{appointment.address}</p>
                {deleteOneMenu}
              </li>
              }
            })

        let x = <div className="slotInfoDiv" key={index}>
              <h5>{slot_time}</h5>
            <ul className="appointmentSlotUl">{appointments}</ul></div>

              return x

      })
      return <li className="slotInfoDiv" key={index}>
        <h4><u>{key}</u></h4>
        <ul className="appointmentSlotUl">
          {slotItems}
          </ul>
      </li>
    })

    let oldSlotLi = null

    let oldGroupedByDate = this.state.oldSlots.groupBy('slot_date')

    oldSlotLi = Object.keys(oldGroupedByDate).sort().map((key, index) => {

      let slots = oldGroupedByDate[key]

      let sortedSlots = slots.sort(function(a, b){return a.slot_time - b.slot_time})

      let slotItems = sortedSlots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '0.5':
            slot_time = '9:30 am'
            break;
          case '1':
            slot_time = '10 am'
            break;
          case '1.5':
            slot_time = '10:30 am'
            break;
          case '2':
            slot_time = '11 am'
            break;
          case '2.5':
            slot_time = '11:30 am'
            break;
          case '3':
            slot_time = '12 pm'
            break;
          case '3.5':
            slot_time = '12:30 pm'
            break;
          case '4':
            slot_time = '1 pm'
            break;
          case '4.5':
            slot_time = '1:30 pm'
            break;
          case '5':
            slot_time = '2 pm'
            break;
          case '5.5':
            slot_time = '2:30 pm'
            break;
          case '6':
            slot_time = '3 pm'
            break;
          case '6.5':
            slot_time = '3:30 pm'
            break;
          case '7':
            slot_time = '4 pm'
            break;
          case '7.5':
            slot_time = '4:30 pm'
            break;
          case '8':
            slot_time = '5 pm'
            break;
          case '8.5':
            slot_time = '5:30 pm'
            break;
          }

          let appointments = this.state.appointments.map((appointment, index) => {

            let deleteOneMenu = null

            if(this.state.deleteOneMenu){
              deleteOneMenu = <div className="deleteMenuDiv"><p><u>Delete this appointment?</u></p>

              <button onClick={()=>this.deleteOne(appointment)}>Delete</button><button onClick={this.toggleDeleteOneOption}>Go back</button></div>
            }

            if(slot._id === appointment.slots){
              return <li className="appointmentInfoLi" key={index + 100}>
                <p>{appointment.name}</p>
                <p>{appointment.phone}</p>
                <p>{appointment.email}</p>
                <p>{appointment.address}</p>
                {deleteOneMenu}
              </li>
              }
            })

        let x = <div className="slotInfoDiv" key={index}>
              <h5>{slot_time}</h5>
            <ul className="appointmentSlotUl">{appointments}</ul>
          </div>

              return x

      })
      return <li key={index}>
        <h4><u>{key}</u></h4>
        <ul className="appointmentSlotUl">
          {slotItems}
          </ul>
      </li>
    })

    let deleteAppointmentMenu = null

    if(this.state.deleteOneMenu){
      deleteAppointmentMenu = <div><p>Select an appointment to delete</p><p>(The client will NOT be notified automatically)</p><button onClick={this.toggleDeleteOneOption}>Go back</button></div>
    }

    let deleteAllMenu = null

    if(this.state.deleteMenu){
      deleteAllMenu = <div><p>Are you sure you want to delete all past appointments?</p>
      <button onClick={()=>this.DeleteOld(this.state.oldSlots)}>Yes</button><button onClick={this.toggleDeleteAllOption}>Go back</button></div>
    }

    return (
    <div className = 'centered'>
      <h1><u>Appointments</u></h1>
      <button className="buttonOne" onClick={this.toggleDeleteOneOption}>Delete An Appointment</button>
      {deleteAppointmentMenu}
      <div>
        <h3><u>Awaiting confirmation</u></h3>
        <ul className="appointmentSlotUl" id="unconfirmedSlot">
          {unconfirmedSlotDate}
        </ul>
      </div>
      <div>
        <h3><u>Confirmed</u></h3>
        <ul className="appointmentSlotUl" id="confirmedSlot">
          {confirmedSlotLi}
        </ul>
      </div>
      <div>
        <h3><u>Past Appointments</u></h3>
        <button onClick={this.toggleDeleteAllOption}>Delete past appointments</button>
        {deleteAllMenu}
        <ul className="appointmentSlotUl" id="oldSlots">
          {oldSlotLi}
        </ul>
      </div>
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
export default connect(mapStateToProps)(withRouter(ViewAppointments))
