const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const { errorHnalder } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (res, req) => {
    res.sendFile(
      path.resolve(__dirname, '../frontend', '/build', '/index.html')
    );
  });
} else {
  app.get('/', (req, res) => res.json('Please set to production!'));
}

app.use(errorHnalder);

app.listen(port, () => console.log(`Server started on port ${port}`));
