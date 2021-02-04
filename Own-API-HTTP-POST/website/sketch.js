function setup() {
    createCanvas(400, 400);
    console.log('running');

    let button = select('#submit');
    button.mousePressed(submitWord);

    let buttonA = select('#analyze');
    buttonA.mousePressed(analyzeThis);
}

function analyzeThis() {
    var txt = select('#textInput').value();

    let data = {
        text: txt
    }

    httpPost('http://localhost:3000/analyze/', data, 'json', dataPosted, postErr);
}

function dataPosted(result) {
    console.log(result)
}

function postErr(err) {
    console.log(err)
}

function submitWord() {
    let word = select('#word').value();
    let score = select('#score').value();

    console.log(word, score)
    loadJSON(`http://localhost:3000/add/${word}/${score}`, finished);
    function finished(data) {
        console.log(data)
    }
}