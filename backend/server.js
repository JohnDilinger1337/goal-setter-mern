const express = require('express');
const dotenv = require('dotenv').config();
const { errorHnalder } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHnalder);

app.listen(port, () => console.log(`Server started on port ${port}`));
