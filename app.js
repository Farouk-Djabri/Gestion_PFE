require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const db = require('./config/db');
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const profRoutes = require('./src/routes/prof.routes');
const adminRoutes = require('./src/routes/admin.routes');
const studentRoutes = require('./src/routes/student.routes');

app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/professor', profRoutes);





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});