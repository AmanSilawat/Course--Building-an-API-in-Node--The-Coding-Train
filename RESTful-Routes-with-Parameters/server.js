const express = require('express');
const app = express();
const server = app.listen(3000, listening);

function listening() {
    console.log('listening...')
}

app.use(express.static('website'));

let words = {
    'rainbow': 5,
    'unicorn': 3,
    'doom': -3,
    'gloom': -2
}

// add word in words Object
app.get('/add/:word/:score?', function addWord(req, res) {
    let data = req.params;
    let word = data.word;
    let score = data.score;

    let reply;
    if (typeof score == 'undefined') {
        reply = {
            msg: "Score is require."
        }
    } else {
        words[word] = score;

        reply = {
            msg: "Tank you for your word."
        }
    }
    res.send(reply);
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