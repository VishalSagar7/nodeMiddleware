s
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 3000;


function requestLogger(req, res, next) {
    
    const currentTime = new Date().toISOString();
    const log = `Time: ${currentTime}, Method: ${req.method}, URL: ${req.url}, IP: ${req.ip}`;

    
    fs.appendFile(path.join(__dirname, 'request_logs.txt'), log + '\n', (err) => {
        if (err) {
            console.error('Failed to write log to file:', err);
        }
    });

    next(); 
}


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


app.use(requestLogger);


app.get('/', (req, res) => {
    res.send('Welcome to the Express Logging App!');
});

app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

app.post('/submit', (req, res) => {
    res.send('Form submitted successfully!');
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
