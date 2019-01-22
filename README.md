# Chiro Delivered
*Created by [Ryan Gawick](https://github.com/rgawick) and [Jack Cattanach](https://github.com/jcattanach)*

Chiro Delivered is a full stack web application built with the MERN stack.  It was created for an actual business and is currently being used to schedule patients for chiropractic services. Patients can create an account, schedule appointments, leave feedback and review or delete their own upcoming appointments. When a patient schedules an appointment, they receive a text message to thank them for scheduling. They then receive an additional text message once the appointment has been confirmed by the doctor. The doctor has her own login where she can manage user accounts, confirm appointments, view feedback, and block off times where she is not available. 

### Live Url ###

https://www.chirodelivered.com/

### Front End ###

The front end of this project was built with React, Redux, Bootstrap, Material-UI, JSX and HTML.

### Back End ###

The back end of this project was built with Node.Js, MongoDB, and Express. It also includes Bcrypt for password encryption, Nexmo for sending out appointment confirmation texts messages, and Mongoose to connect with the MLabs online MongoDB database. The front and backend communciate wth each other using Axios for the HTTP requests.

### Screenshots ###

![Schedule](https://github.com/rgawick/chiro_delivered/blob/master/CD-Schedule.png)
*Scheduling an appointment, built with Material-UI's date picker and stepper.* 


![Review Appointments](https://github.com/rgawick/chiro_delivered/blob/master/CD-screenshot.png)
*Reviewing patient appointments from the admin view.*


![Admin Options](https://github.com/rgawick/chiro_delivered/blob/master/CD_Admin.gif)
*The admin options including confirming / reviewing apppointments, viewing users, and viewing feedback.*
