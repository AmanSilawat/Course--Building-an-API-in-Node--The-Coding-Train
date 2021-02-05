// ! Saving Data to JSON File with Node.js
const express = require('express');
const fs = require('fs')
const app = express();
const server = app.listen(3000, listening);


function listening() {
    console.log('listening...')
}

app.use(express.static('website'));

let data = fs.readFileSync('./words.json'); // get data
let words = JSON.parse(data) // convert buffer data to string

// add word in words Object
app.get('/add/:word/:score?', function addWord(req, res) {
    let data = req.params;
    let word = data.word;
    let score = Number(data.score);

    let reply;
    if (typeof score == 'undefined') {
        reply = {
            msg: "Score is require."
        }
    } else {
        words[word] = score;
        let data = JSON.stringify(words, null, 4); // convert object to string
        fs.writeFile('words.json', data, finished)
        function finished(err) {
            console.log('all set.');
            reply = {
                word: word,
                score: score,
                status: "success"
            }
            res.send(reply);
        }
    }
});

// get all words
app.get('/all', function sendAll(req, res) {
    res.send(words);
});

// search word
app.get('/search/:word', function searchWord(req, res) {
    let word = req.params.word;
    let reply;
    if (words[word]) {
        reply = {
            status: 'found',
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: 'not found',
            word: word
        }
    }
    res.send(reply)
});