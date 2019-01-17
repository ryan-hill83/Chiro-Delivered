import React, { Component } from 'react'
import axios from "axios"

class LateButton extends Component {

    googleCall = () => {axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Houston+TX&destinations=Dallas+TX&key=').then(response => {
        console.log(response.data);
        // this.handleDBReponse(response.data)
      })}

    render() {
          function success(pos) {
            var crd = pos.coords
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`); 
            console.log("test")
        }
    
            navigator.geolocation.getCurrentPosition(success)
    
      return (
          <div>
              <button onClick={this.googleCall}> Running Late  </button>
            
          </div>
      );
    }
  }
  
  export default LateButton;