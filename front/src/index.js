import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Ui from "./components/Ui"
import Home from './components/Home'
import LateButton from './components/LateButton'
import LeaveFeedback from './components/LeaveFeedback'
import Register from './components/Register'
import ViewAppointments from './components/ViewAppointments'
import BlackoutTimes from './components/BlackoutTimes'
import ViewUsers from './components/ViewUsers'
import ViewFeedback from './components/ViewFeedback'
import MyAppointments from './components/MyAppointments'
import { createStore } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import Popper from 'popper.js'
import store from './store/Store'


// const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <App>
    <Switch>
        <Route exact path="/" component = {Home} />
        <Route path="/appointmentCreate" component = {Ui} />
        <Route path="/leaveFeedback" component = {LeaveFeedback} />
        <Route path="/late" component = {LateButton} />
        <Route path="/registerUser" component = {Register} />
        <Route path="/appointments" component = {ViewAppointments} />
        <Route path="/blackoutTimes" component = {BlackoutTimes} />
        <Route path="/ViewUsers" component = {ViewUsers} />
        <Route path="/ViewFeedback" component = {ViewFeedback} />
        <Route path="/MyAppointments" component = {MyAppointments} />
    </Switch>
    </App>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// <Route path="/getFeedback" component = {GetFeedback} />
// <Route path="/viewusers" component = {UserList} />
// <Route path="/late" component = {LateButton} />
