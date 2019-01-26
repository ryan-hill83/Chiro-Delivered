<<<<<<< HEAD
<<<<<<< HEAD
# chiro_delivered
=======
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
>>>>>>> 3ad3412140ba4a13d6ac64c37087c5e94ca03cd3
=======
# Chiro Delivered
*Created by [Ryan Gawick](https://github.com/rgawick) and [Jack Cattanach](https://github.com/jcattanach)*

Chiro Delivered is a full stack web application built with the MERN stack.  It was created for an actual business and is currently being used to schedule patients for chiropractic services. Patients can create an account, schedule appointments, leave feedback and review or delete their own upcoming appointments. When a patient schedules an appointment, they receive a text message to thank them for scheduling. They then receive an additional text message once the appointment has been confirmed by the doctor. The doctor has her own login where she can manage user accounts, confirm appointments, view feedback, and block off times where she is not available. 

### Live URL ###

https://www.chirodelivered.com/

### Front End ###

The front end of this project was built with React, Redux, Bootstrap, Material-UI, JSX, HTML and CSS.

### Back End ###

The back end of this project was built with Node.Js, MongoDB, and Express. It also includes Bcrypt for password encryption, Nexmo for sending out appointment confirmation texts messages, and Mongoose to connect with the MLabs online MongoDB database. The front and backend communciate wth each other using Axios for the HTTP requests.

### Screenshots ###

![Schedule](https://github.com/rgawick/chiro_delivered/blob/master/CD-Schedule.png)
*Scheduling an appointment, built with Material-UI's date picker and stepper.* 


![Review Appointments](https://github.com/rgawick/chiro_delivered/blob/master/CD-screenshot.png)
*Reviewing patient appointments from the admin view.*


![Admin Options](https://github.com/rgawick/chiro_delivered/blob/master/CD_Admin.gif)
*The admin options including confirming / reviewing apppointments, viewing users, and viewing feedback.*
>>>>>>> 583cce8f10db3b2782c818159b0c5f97c3c4e414
