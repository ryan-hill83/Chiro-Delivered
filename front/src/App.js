import React, { Component } from 'react';
import logo from './logo.svg';
import Ui from "./components/Ui.js"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <MuiThemeProvider>
        {this.props.children}
      </MuiThemeProvider>
    </div>
    );
  }
}

export default App;
