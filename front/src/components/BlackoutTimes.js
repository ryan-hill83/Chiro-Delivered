import React, { Component } from 'react';
import axios from "axios";
import Checkbox from './Checkbox'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './style.css'

const API_BASE = "http://localhost:8080/"

class BlackoutTimes extends Component {
    constructor(props) {
        super(props)

    this.state = {
        startDate: new Date(),
        selectedDate: null,
        blackoutTimes: [],
        times: [ {id:1, slot:0, value: "9:00 am - 9:30 am", isChecked: false},
        {id:2, slot:.5, value: "9:30 am - 10:00 am", isChecked: false},
        {id:3, slot:1, value: "10:00 am - 10:30 am", isChecked: false},
        {id:4, slot:1.5, value: "10:30 am - 11:00 am", isChecked: false},
        {id:5, slot:2, value: "11:00 am - 11:30 am", isChecked: false},
        {id:6, slot:2.5, value: "11:30 am - 12:00 pm", isChecked: false},
        {id:7, slot:3, value: "12:00 pm - 12:30 pm", isChecked: false},
        {id:8, slot:3.5, value: "12:30 pm - 1:00 pm", isChecked: false},
        {id:9, slot:4, value: "1:00 pm - 1:30 pm", isChecked: false},
        {id:10, slot:4.5, value: "1:30 pm - 2:00 pm", isChecked: false},
        {id:11, slot:5, value: "2:00 pm - 2:30 pm", isChecked: false},
        {id:12, slot:5.5, value: "2:30 pm - 3:00 pm", isChecked: false},
        {id:13, slot:6, value: "3:00 pm - 3:30 pm", isChecked: false},
        {id:14, slot:6.5, value: "3:30 pm - 4:00 pm", isChecked: false},
        {id:15, slot:7, value: "4:00 pm - 4:30 pm", isChecked: false},
        {id:16, slot:7.5, value: "4:30 pm - 5:00 pm", isChecked: false},
        {id:17, slot:8, value: "5:00 pm - 5:30 pm", isChecked: false},
        {id:18, slot:8.5, value: "5:30 pm - 6:00 pm", isChecked: false}
        ]
      }
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (date) => {
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let formattedDate = year + "-" + (month <= 9 ? '0' + month : month) + (day <= 9 ? '0' + day : day) 
      console.log(formattedDate)
      console.log(date)
      this.setState({
        startDate: date,
        selectedDate: formattedDate
      })
    }


    handleAllChecked = (event) => {
        let times = this.state.times
        times.forEach(time => time.isChecked = event.target.checked)
        this.setState({times: times})
      }

      handleCheckChildElement = (event) => {
        let times = this.state.times
        times.forEach(time => {
           if (time.value === event.target.value)
              time.isChecked =  event.target.checked
        })
        this.setState({times: times})
      }

    handleAddToArray = () => {
      let blackoutTimes = this.state.times.filter((el) => {
          return el.isChecked === true
      })
      let blackoutSlots = blackoutTimes.map((slot) => {
          return slot.slot.toString()
      })
      let blackoutObjects = blackoutSlots.map((slot) => {
        let slotObject = {slot_time: slot, slot_date: this.state.selectedDate, is_confirmed: true }
          return slotObject
      })
      console.log(blackoutObjects)

      axios.post(API_BASE + "blackoutTimes", blackoutObjects)
      .then(response =>
       console.log("Added!!")
      )
      .catch(err => {
        console.log(err)
      })
    }


      render(){
          return(
          <div className="margins">
                  <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
              <p>Select time slots where you will be unavailable:</p>
              <input type="checkbox" onChange={this.handleAllChecked} value="checkedall" /> Select All
               <ul>
               {
                 this.state.times.map((time, index) => {
                   return (<Checkbox key={index} handleCheckChildElement={this.handleCheckChildElement}  {...time} />)
                 })
               }
               </ul>
               <button onClick={this.handleAddToArray}>Submit</button>
          </div>
          )
      }

}

export default BlackoutTimes
