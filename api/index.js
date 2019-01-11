const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const mongodbURL = 'mongodb://finalproject2019:final2019@ds247674.mlab.com:47674/appointments'
mongoose.connect(mongodbURL, { useNewUrlParser: true });
const db = mongoose.connection;
const dotenv = require('dotenv');
dotenv.load();
const PORT = 8080
const Nexmo = require("nexmo");
const Slot = require('./schemas/Slot')
const Appointment = require('./schemas/Appointment')
const Feedback = require('./schemas/Feedback')
const User = require('./schemas/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;


const API_KEY = process.env.API_KEY
const SECRET_KEY = process.env.SECRET_KEY

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDb...')
});

app.get("/retrieveSlots", (req, res) => {
  // Returns all Slots
    Slot.find({})
        .exec((err, slots) => res.json(slots))
})

app.get('/appointments', (req, res) => {
  // Returns all appointments
  Appointment.find({}).exec((err, appointments) => res.json(appointments));
})

app.put('/confirmAppointment/:slotId',(req,res) => {
  let slotId = req.params.slotId

  console.log(req.body.slot)

  let clientName = req.body.data.appointment.name
  let clientPhone = req.body.data.appointment.phone

  Slot.findByIdAndUpdate(slotId,{is_confirmed: true},{new: true},(error,updatedSlot) => {
    res.json(updatedSlot)
  })

  const nexmo = new Nexmo({
    apiKey: API_KEY,
    apiSecret: SECRET_KEY
  });

  let msg =
    clientName +
    " this message is to notify you that your appointment with Chiro Delevered on " +
    req.body.slot.item.slot_date + " has been confirmed."

  const from = '18143000679';
  const to = clientPhone;

  nexmo.message.sendSms(from, to, msg, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      console.dir(responseData);
    }
  });
})
app.put('/denyAppointment/:slotId',(req,res) => {
  console.log("work in progress")
})


app.post('/blackoutTimes', (req,res) => {
  for(i=0; i < req.body.length; i++) {
  var newslot = new Slot({
    slot_time: req.body[i].slot_time,
    slot_date: req.body[i].slot_date,
    is_confirmed: true,
    created_at: Date.now()
  });
  newslot.save()
  var newappointment = new Appointment({
    name: "Blackout",
    slots: newslot._id
  });
  newappointment.save()
}
  res.send(JSON.stringify({message: 'Added to database!!'}))
})


app.post('/appointmentCreate', (req,res) => {

  console.log(req.body.address)

  var newslot = new Slot({
    slot_time: req.body.slot_time,
    slot_date: req.body.slot_date,
    is_confirmed: false,
    created_at: Date.now()
  });
  newslot.save();
  // Creates a new record from a submitted form
  var newappointment = new Appointment({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    slots: newslot._id
  });

  const nexmo = new Nexmo({
    apiKey: API_KEY,
    apiSecret: SECRET_KEY
  });

  let msg =
    req.body.name +
    " " +
    "this message is to confirm your appointment at" +
    " " +
    req.body.appointment;

  // and saves the record to
  // the data base
  newappointment.save((err, saved) => {
    // Returns the saved appointment
    // after a successful save
    Appointment.find({ _id: saved._id })
      .populate("slots")
      .exec((err, appointment) => res.json(appointment));

    const VIRTUAL_NUMBER = '18143000679'
    const RECIPIENT_NUMBER = req.body.phone

    const from = VIRTUAL_NUMBER;
    const to = RECIPIENT_NUMBER;

    nexmo.message.sendSms(from, to, msg, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    });
  });
})

app.post('/registerUser', (req,res) => {

  let newUser = req.body.newUser

  let firstName = newUser.firstName
  let lastName = newUser.lastName
  let phone = newUser.phone
  let email = newUser.email
  let password = newUser.password

  User.findOne({email: email},(error,user) => {
    if(!user){
      bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        var newUser = new User({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          password: hash,
          email: email,
          isAdmin: false,
          created_at: Date.now()
        });
        newUser.save();

        res.send(JSON.stringify({message: 'User created succesfully'}))
      });
    } else {
      res.send(JSON.stringify({message: 'This email address is already registered...'}))
    }
})
})
app.post('/login', (req,res) => {

  let user = req.body.user

  console.log(user)
  let password = user.password
  let email = user.email


  User.findOne({email: email},(error,user) => {
    if(!user){
      res.send(JSON.stringify({message: 'This email address in not registered...'}))
    } else {
    bcrypt.compare(password, user.password, function(err, response) {
      if(response){
        res.send(JSON.stringify({isAuthenticated: true, isAdmin: user.isAdmin, user: user}))
      } else {
        res.send(JSON.stringify({message: 'Password is incorrect...'}))
      }
});
}
})
})

app.get('/getFeedback', (req,res) => {
  Feedback.find({}).exec((err, feedback) => res.json(feedback));
})

app.post('/leaveFeedback', (req,res) => {

  body = req.body.body

  var newFeedback = new Feedback()

  if(req.body.name){
    let name = req.body.name
    newFeedback.name = name
  } else {
    newFeedback.name = 'Anonymous'
  }
  newFeedback.body = body

  newFeedback.save(function(err,feedback){
    if(err){
      res.send(JSON.stringify({message: 'Sorry, there was an error'}))
    }else{
      res.send(JSON.stringify({message: 'Thank you for your feedbck!'}))
    }
  })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
