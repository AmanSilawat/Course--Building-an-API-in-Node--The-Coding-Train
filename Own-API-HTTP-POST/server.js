// ! Saving Data to JSON File with Node.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = app.listen(3000, listening);


function listening() {
    console.log('listening...')
}

app.use(express.static('website'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

let data = fs.readFileSync('./additional.json'); // get data
let afinnData = fs.readFileSync('./afinn111.json'); // get data

let additional = JSON.parse(data) // convert buffer data to string
let afinn = JSON.parse(afinnData);

app.post('/analyze', function analyzeThis(req, res) {
    let txt = req.body.text;
    let words = txt.split(/\W+/);
    let totalScore = 0;
    let worldList = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let score = 0;
        let found = false;
        if (additional.hasOwnProperty(word)) {
            score = Number(additional[word]);
            found = true;
        } else if (afinn.hasOwnProperty(word)) {
            score += Number(afinn[word]);
            found = true;
        }
        if (found == true) {
            worldList.push({ word, score})
        }
        totalScore += score;
    }

    let comp = totalScore / words.length;

    let reply = {
        score: totalScore,
        comparative: comp,
        word: worldList
    }
    res.send(reply)
})

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
        additional[word] = score;
        let data = JSON.stringify(additional, null, 4); // convert object to string
        fs.writeFile('additional.json', data, finished)
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
    let data = {
        additional: additional,
        afinn: afinn
    }
    res.send(data);
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