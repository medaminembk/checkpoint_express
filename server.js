
const express = require('express');
const app = express();
const port = 3000; // You can change the port if needed
app.use(express.static(__dirname + '/public'));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', __dirname + '/views');


// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const hour = currentDate.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    const divStyles = 'background-color: blue; color: white; padding: 10px;';
  const content = '<div style="' + divStyles + '">Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).</div>';
  res.send(content);
  }
};

// Set up routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('index');
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services');
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
