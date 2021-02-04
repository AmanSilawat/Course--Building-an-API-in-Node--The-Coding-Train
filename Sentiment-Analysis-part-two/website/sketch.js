// http://www2.imm.dtu.dk/pubdb/pubs/6010-full.html
let afinn = {};

function preload() {
    afinn = loadJSON('afinn111.json');
}

function setup() {
    createCanvas();

    let txt = select('#txt');
    txt.input(typing);

    function typing() {
        let textInput = txt.value();
        let words = textInput.split(/\W/)
        console.log(words);
        var scoreWords = [];
        let totalScore = 0

        for (let i = 0; i < words.length; i++) {
            let word = words[i].toLowerCase();
            if (afinn.hasOwnProperty(word)) {
                let score = afinn[word];
                totalScore += Number(score);
                scoreWords.push(`${word}:${score} `);
            }
        }
        console.log(score)
        let scoreP = select('#score');
        scoreP.html(`score: ${totalScore}`);

        let comp = select('#comparative');
        comp.html(`comparative: ${totalScore / words.length}`);

        let wordList = select('#wordList');
        wordList.html(scoreWords);
    }
}