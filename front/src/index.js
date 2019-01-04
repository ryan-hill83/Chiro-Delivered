import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import Ui from "./components/Ui"
import Home from './components/Home'
import LeaveFeedback from './components/LeaveFeedback'

ReactDOM.render(
    <BrowserRouter>
    <App>
    <Switch>
        <Route exact path="/" component = {Home} />
        <Route path="/appointmentCreate" component = {Ui} />
        <Route path="/leaveFeedback" component = {LeaveFeedback} />
    </Switch>
    </App>
    </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// <Route path="/appointments" component = {ViewAppointments} />
// <Route path="/registerUser" component = {Register} />
// <Route path="/getFeedback" component = {GetFeedback} />
// <Route path="/viewusers" component = {UserList} />
// <Route path="/late" component = {LateButton} />
