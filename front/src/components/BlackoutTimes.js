import React, { Component } from 'react';
import axios from "axios";
import Checkbox from './Checkbox'

class BlackoutTimes extends Component {
    constructor(props) {
        super(props)

    this.state = {
        blackoutTimes: [],
        times: [ {id:1, value: "9:00 am - 9:30 am", isChecked: false},
        {id:2, value: "9:30 am - 10:00 am", isChecked: false},
        {id:3, value: "10:00 am - 10:30 am", isChecked: false},
        {id:4, value: "10:30 am - 11:00 am", isChecked: false},
        {id:5, value: "11:00 am - 11:30 am", isChecked: false},
        {id:6, value: "11:30 am - 12:00 pm", isChecked: false},
        {id:7, value: "12:00 pm - 12:30 pm", isChecked: false},
        {id:8, value: "12:30 pm - 1:00 pm", isChecked: false},
        {id:9, value: "1:00 pm - 1:30 pm", isChecked: false},
        {id:10, value: "1:30 pm - 2:00 pm", isChecked: false},
        {id:11, value: "2:00 pm - 2:30 pm", isChecked: false},
        {id:12, value: "2:30 pm - 3:00 pm", isChecked: false},
        {id:13, value: "3:00 pm - 3:30 pm", isChecked: false},
        {id:14, value: "3:30 pm - 4:00 pm", isChecked: false},
        {id:15, value: "4:00 pm - 4:30 pm", isChecked: false},
        {id:16, value: "4:30 pm - 5:00 pm", isChecked: false}
        ]
      }
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
    

      render(){
          return(
          <div>
              <p>Select time slots where you will be unavailable:</p>
              <input type="checkbox" onChange={this.handleAllChecked} value="checkedall" /> Select All
               <ul>
               {
                 this.state.times.map((time, index) => {
                   return (<Checkbox key={index} handleCheckChildElement={this.handleCheckChildElement}  {...time} />)
                 })
               }
               </ul>
          </div>
          )
      }
}

export default BlackoutTimes 