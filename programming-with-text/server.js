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