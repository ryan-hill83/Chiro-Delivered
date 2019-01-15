import React, { Component } from 'react';
import axios from "axios";

const APPOINTMENT_URL = 'http://localhost:8080/appointments'
const CONFIRMED_SLOT_URL = 'http://localhost:8080/retrieveConfirmedSlots'
const UNCONFIRMED_SLOT_URL = 'http://localhost:8080/retrieveUnconfirmedSlots'
const OLD_SLOT_URL = 'http://localhost:8080/retrieveOldSlots'
const CONFIRM_URL = 'http://localhost:8080/confirmAppointment/'
const DENY_URL = 'http://localhost:8080/denyAppointment/'
const DELETE_OLD_URL = 'http://localhost:8080/DeleteOld'

let unconfirmedSlotArr = []
let oldSlotArr = []

class ViewAppointments extends Component {

  state = {
    appointments: [],
    confirmedSlots: [],
    unconfirmedSlots: [],
    oldSlots: [],
    deleteMenu: false
  }

  componentDidMount() {
    this.fetchAppointments()
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
      this.fetchAppointments()
    })
  }

  toggleDeleteAllOption = () => {
    let doesShow = this.state.deleteMenu
    this.setState({
      deleteMenu: !doesShow
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

      let slotItems = slots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '.5':
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

            if(slot._id === appointment.slots){
              return <li key={index + 100}>
                <p>{appointment.name}</p>
                <p>{appointment.phone}</p>
                <p>{appointment.email}</p>
                <p>{appointment.address}</p>
                <button onClick={() => this.confirmAppointment({appointment},{slot})}>Confirm</button>
              </li>
              }
            })

        let x = <div key={index}>
              <h5>{slot_time}</h5>
            <ul>{appointments}</ul></div>

              return x


      })

      return <li key={index}>
        <h4>{key}</h4>
        <ul>
          {slotItems}
          </ul>
      </li>

    })

    let confirmedSlotLi = null

    let groupedByDate = this.state.confirmedSlots.groupBy('slot_date')

    confirmedSlotLi = Object.keys(groupedByDate).sort().map((key, index) => {

      let slots = groupedByDate[key]

      // console.log(key)

      let sortedSlots = slots.sort(function(a, b){return a - b})

      let slotItems = slots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '.5':
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

            if(slot._id === appointment.slots){
              return <li key={index + 100}>
                <p>{appointment.name}</p>
                <p>{appointment.phone}</p>
                <p>{appointment.email}</p>
                <p>{appointment.address}</p>
              </li>
              }
            })

        let x = <div key={index}>
              <h5>{slot_time}</h5>
            <ul>{appointments}</ul></div>

              return x

      })
      return <li key={index}>
        <h4>{key}</h4>
        <ul>
          {slotItems}
          </ul>
      </li>
    })

    let oldSlotLi = null

    let oldGroupedByDate = this.state.oldSlots.groupBy('slot_date')

    oldSlotLi = Object.keys(oldGroupedByDate).sort().map((key, index) => {

      let slots = oldGroupedByDate[key]

      // console.log(key)

      let sortedSlots = slots.sort(function(a, b){return a - b})

      let slotItems = slots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '.5':
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

            if(slot._id === appointment.slots){
              return <li key={index + 100}>
                <p>{appointment.name}</p>
                <p>{appointment.phone}</p>
                <p>{appointment.email}</p>
                <p>{appointment.address}</p>
              </li>
              }
            })

        let x = <div key={index}>
              <h5>{slot_time}</h5>
            <ul>{appointments}</ul></div>

              return x

      })
      return <li key={index}>
        <h4>{key}</h4>
        <ul>
          {slotItems}
          </ul>
      </li>
    })

    let deleteAllMenu = null

    if(this.state.deleteMenu){
      deleteAllMenu = <div>Are you sure you want to delete all past appointments?
      <button onClick={()=>this.DeleteOld(this.state.oldSlots)}>Yes</button><button onClick={this.toggleDeleteAllOption}>Go back</button></div>
    }

    return (
    <div>
      <div>
        <h3>Awaiting confirmation</h3>
        <ul id="unconfirmedSlot">
          {unconfirmedSlotDate}
        </ul>
      </div>
      <div>
        <h3>Confirmed</h3>
        <ul id="confirmedSlot">
          {confirmedSlotLi}
        </ul>
      </div>
      <div>
        <h3>Past Appointments</h3>
        <button onClick={this.toggleDeleteAllOption}>Delete past appointments</button>
        {deleteAllMenu}
        <ul id="oldSlots">
          {oldSlotLi}
        </ul>
      </div>
    </div>
    );
  }
}

export default ViewAppointments;
