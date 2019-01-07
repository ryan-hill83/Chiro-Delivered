import React, { Component } from 'react';
import axios from "axios";

const APPOINTMENT_URL = 'http://localhost:8080/appointments'
const SLOT_URL = 'http://localhost:8080/retrieveSlots'

class ViewAppointments extends Component {

  state = {
    appointments: [],
    slots: []
  }

  componentDidMount() {
    axios.get(APPOINTMENT_URL)
    .then(res => {
      const appointments = res.data;
      console.log(appointments)
      this.setState({ appointments })
    })

    axios.get(SLOT_URL)
    .then(res => {
      const slots = res.data;
      console.log(slots)
      this.setState({ slots })
    })
  }

  render() {

    let slotLi = null

    slotLi = this.state.slots.map((item,index) => {

      let slot_time = null

      if(item.slot_time == 0){
        slot_time = '9 am'
      } else if (item.slot_time == 1) {
        slot_time = '10 am'
      } else if (item.slot_time == 2) {
        slot_time = '11 am'
      } else if (item.slot_time == 3) {
        slot_time = '12 pm'
      } else if (item.slot_time == 4) {
        slot_time = '1 pm'
      } else if (item.slot_time == 5) {
        slot_time = '2 pm'
      } else if (item.slot_time == 6) {
        slot_time = '3 pm'
      } else if (item.slot_time == 7) {
        slot_time = '4 pm'
      } else if (item.slot_time == 8) {
        slot_time = '5 pm'}


      let result = <div>
        <h4>{item.slot_date}</h4>
        <h5>{slot_time}</h5>
      </div>
      let appointments = this.state.appointments.map((appointment, index) => {
        if(item._id === appointment.slots){
          return <li key={index + 100}>
            <p>{appointment.name}</p>
            <p>{appointment.phone}</p>
            <p>{appointment.email}</p>
          </li>
          }
        })

        return <li key={index}>
          {result}
          <ul>
            {appointments}
          </ul>
        </li>
    })

    return (
    <div>
      <ul>
      {slotLi}
      </ul>
    </div>
    );
  }
}

export default ViewAppointments;
