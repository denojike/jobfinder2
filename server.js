const express = require('express');
const cors = require('cors');
const path = require('path');
// const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

//middleware
// Init Middleware for bodyparse
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json({ extended: false }));

//Routes
app.use('/api/jobs/', require('./routes/jobs'));
app.use('/api/updateJob/', require('./routes/jobs'));
app.use('/api/deleteJob/', require('./routes/jobs'));
//login employer with POST or confirm login with GET
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/emplogin/', require('./routes/auth'));
app.use('/api/employers/', require('./routes/employers'));
app.use('/api/updateEmployer/', require('./routes/employers'));
app.use('/api/updatePassword/', require('./routes/employers'));
app.use('/api/deleteEmployer/', require('./routes/employers'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
