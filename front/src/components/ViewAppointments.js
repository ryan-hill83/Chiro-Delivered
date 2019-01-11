import React, { Component } from 'react';
import axios from "axios";

const APPOINTMENT_URL = 'http://localhost:8080/appointments'
const SLOT_URL = 'http://localhost:8080/retrieveSlots'
const CONFIRM_URL = 'http://localhost:8080/confirmAppointment/'
const DENY_URL = 'http://localhost:8080/denyAppointment/'

class ViewAppointments extends Component {

  state = {
    appointments: [],
    slots: []
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

    axios.get(SLOT_URL)
    .then(res => {
      const slots = res.data;
      this.setState({ slots })
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

  render() {


    Array.prototype.groupBy = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }

    let groupedByDate = this.state.slots.groupBy('slot_date')

    let uncomfirmedSlotDate = null

    Object.entries(groupedByDate).map((data) => {
      console.log(data)
      // let a = groupedByDate[key]
      // console.log(a)
    })

    uncomfirmedSlotDate = Object.keys(groupedByDate).map((key, index) => {

      let slots = groupedByDate[key]

      let slotItems = slots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '1':
            slot_time = '10 am'
            break;
          case '2':
            slot_time = '11 am'
            break;
          case '3':
            slot_time = '12 pm'
            break;
          case '4':
            slot_time = '1 pm'
            break;
          case '5':
            slot_time = '2 pm'
            break;
          case '6':
            slot_time = '3 pm'
            break;
          case '7':
            slot_time = '4 pm'
            break;
          case '8':
            slot_time = '5 pm'
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


            if(!slot.is_confirmed){
              return x
            }

      })

      return <li key={index}>
        <h4>{key}</h4>
        <ul>
          {slotItems}
          </ul>
      </li>

    })

    let confirmedSlotLi = null

    confirmedSlotLi = Object.keys(groupedByDate).map((key, index) => {

      let slots = groupedByDate[key]

      console.log(key)

      let sortedSlots = slots.sort(function(a, b){return a - b})

      let slotItems = slots.map((slot, index) => {

        let slot_time = null

        switch(slot.slot_time){
          case '0':
            slot_time = '9 am'
            break;
          case '1':
            slot_time = '10 am'
            break;
          case '2':
            slot_time = '11 am'
            break;
          case '3':
            slot_time = '12 pm'
            break;
          case '4':
            slot_time = '1 pm'
            break;
          case '5':
            slot_time = '2 pm'
            break;
          case '6':
            slot_time = '3 pm'
            break;
          case '7':
            slot_time = '4 pm'
            break;
          case '8':
            slot_time = '5 pm'
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

            if(slot.is_confirmed === true){
              return x
            }
      })
      return <li key={index}>
        <h4>{key}</h4>
        <ul>
          {slotItems}
          </ul>
      </li>
    })

    return (
    <div>
      <div>
        <h3>Awaiting confirmation</h3>
        <ul id="unconfirmedSlot">
          {uncomfirmedSlotDate}
        </ul>
      </div>
      <div>
        <h3>Confirmed</h3>
        <ul id="confirmedSlot">
          {confirmedSlotLi}
        </ul>
      </div>
    </div>
    );
  }
}

export default ViewAppointments;
