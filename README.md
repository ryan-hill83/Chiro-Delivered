# Chiro Delivered
*Created by [Ryan Gawick](https://github.com/rgawick) and [Jack Cattanach](https://github.com/jcattanach)*

Chiro Delivered is a full stack web application built with the MERN stack.  It was created for an actual business and is currently being used to schedule patients for chiropractic services. Patients can create an account, schedule appointments, leave feedback and review or delete their own upcoming appointments. When a patient schedules an appointment, they receive a text message to thank them for scheduling. They then receive an additional text message once the appointment has been confirmed by the doctor. The doctor has her own login where she can manage user accounts, confirm appointments, view feedback, and block off times where she is not available. 

### Live URL ###

https://www.chirodelivered.com/

### Front End ###

The front end of this project was built with React, Redux, Bootstrap, Material-UI, JSX, HTML and CSS.

### Back End ###

The back end of this project was built with Node.Js, MongoDB, and Express. It also includes Bcrypt for password encryption, Nexmo for sending out appointment confirmation texts messages, and Mongoose to connect with the MLabs online MongoDB database. The front and backend communciate wth each other using Axios for the HTTP requests.

### Videos / Screenshots ###

<a href="https://www.youtube.com/watch?v=5QUqIYNkPfA">Link to YouTube Scheduling Demo<a>
  
![Scheduling](https://github.com/rgawick/chiro_delivered/blob/master/scheduling.gif) 
*The scheduling feature was built using Material-Ui. The patient receives a text through the Nexmo API when they schedule. They receive an additional text when the appointment has been confirmed by the admin.* 


![Patient View](https://github.com/rgawick/chiro_delivered/blob/master/patient_view.gif)
*Patients can schedule new appointments, delete their current appointments or leave feedback.*


![Admin View](https://github.com/rgawick/chiro_delivered/blob/master/admin_view.gif)
*The admin view lets you confirm or delete any upcoming appointments, view feedback, schedule an appointment for a patient or black out days/times when they are not available to work.*
