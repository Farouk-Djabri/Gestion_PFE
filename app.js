require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth.routes');

const app = express();
const path = require('path');
const db = require('./config/db');
const port = 3000;

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const profRoutes = require('./src/routes/prof.routes');
const adminRoutes = require('./src/routes/admin.routes');
const studentRoutes = require('./src/routes/student.routes');
const themeRoutes = require('./src/routes/theme.routes');


app.use('/admin', adminRoutes);
app.use('/home', authRoutes);
app.use('/student', studentRoutes);
app.use('/professor', profRoutes);
app.use('/theme', themeRoutes);



app.get('/login', (req, res) => {
  res.render('login'); // Assuming your login page is named login.ejs
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});