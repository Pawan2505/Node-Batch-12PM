
const express = require('express');
const path = require('path');
const port = 8000

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use('/', require('./route/index'));

app.listen(port, (err) => {
    if (err) {
        return console.error('Error starting server:', err);
    }
  console.log(`Server is running on http://localhost:${port}`);
});