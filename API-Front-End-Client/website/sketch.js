function setup() {
    createCanvas(400, 400);
    drawData();

    let button = select('#submit')
    button.mousePressed(submitWord)
}

function drawData() {
    loadJSON('http://localhost:3000/all', gotData);
}

function submitWord() {
    let word = select('#word').value();
    let score = select('#score').value();

    // console.log(word, score)
    loadJSON(`http://localhost:3000/add/${word}/${score}`, finished);
    function finished(data) {
        console.log(data)
        drawData(); // GET http://localhost:3000/all net::ERR_CONNECTION_REFUSED
    }
}

function gotData(data) {
    // console.log(data)
    background(51);
    let keys = Object.keys(data);
    for (const word of keys) {
        let score = data[word];
        let x = random(width);
        let y = random(height);
        fill(255);
        text(word, x, y);
        textSize(64);
    }
}