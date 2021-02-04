// Once it’s installed, the way to access code from a node package is through the require() function.
const express = require('express');

// With a reference to express, you can then create an express “app”:
const app = express();

// you might listen to connections on a certain port.
const server = app.listen(3000, listening);

// listening is a callback function
function listening() {
    console.log('listening...')
}

// You can also serve static files. , if you have a index.html file and you place it in a folder called website,
app.use(express.static('website'));

// app.get('/flower', function sendFlower(req, res) {
//     res.send('I Love Flower')
// });

// search in browser- "http://localhost:3000/search/sunflower/500"
app.get('/search/:flower/:num', function sendFlower(req, res) {
    let data = req.params;
    let num = data.num;
    let reply = '';
    for (let i = 0; i < num; i++) {
        reply += `I Love ${data.flower} too. `;
    }
    res.send(reply);
});