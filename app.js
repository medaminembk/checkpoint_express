const express = require('express');
const app = express();

// Custom middleware to verify working hours
const verifyWorkingHours = (req, res, next) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const currentDay = currentTime.getDay();

  // Check if it's a weekday and working hours
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};

// Middleware for serving static files (CSS)
app.use(express.static('public'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Routes
app.get('/', verifyWorkingHours, (req, res) => {
  res.render('index');
});

app.get('/services', verifyWorkingHours, (req, res) => {
  res.render('services');
});

app.get('/contact', verifyWorkingHours, (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
