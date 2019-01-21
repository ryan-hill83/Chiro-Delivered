# Chiro Delivered
*Created by [Ryan Gawick](https://github.com/rgawick) and [Jack Cattanach](https://github.com/jcattanach)*

Chiro Delivered is a Full stack web application, built with the MERN stack. The purpose of this appication is to allow users to log in and schedule an appointment, for a mobile chiropractor appointment. The webisite itself is seperated into two parts, for the client and for the admin. Once creating an account, the client is able to schedule an appointment, review or delete their appointments, and leave feedback. The admin is able to review all appoinments, confirm or delete appointments, review users, review feedback, and blackout unavailable days and time slots.

### Live Url ###

https://www.chirodelivered.com/

### Front End ###

The front end of this project was built with React, Redux, Bootstrap, Material-UI, JSX and HTML.

### Back End ###

The back end of this project is built with Node.Js, MongoDB, and Express. It also includes Bcrypt for password encryption, Nexmo for sending out appointment confirmation texts messages, and Mongoose to connect with MLabs online Mongo database. The fron and backend communciate wth each other using Axios for the HTTP requests.

### Screenshots ###

![Schedule](https://github.com/rgawick/chiro_delivered/blob/master/CD-Schedule.png)
*Scheduling appointment, built with Material-UI's date picker and stepper.* 


![Review Appointments](https://github.com/rgawick/chiro_delivered/blob/master/CD-screenshot.png)
*Reviewing appointments for the users*


![Admin Options](https://github.com/rgawick/chiro_delivered/blob/master/CD_Admin.gif)
*The admin options, includng confirming/ reviewing apppointments, viewing users, and viewing feedback*
