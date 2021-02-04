let table;
let afinn = {};

function preload() {
    table = loadTable('AFINN-111.txt', 'tsv');
}

function setup() {
    createCanvas(400, 400);
    console.log(table);

    for (let i = 0; i < table.getRowCount(); i++) {
        let row = table.getRow(i);
        let word = row.get(0);
        let score = row.get(1);
        afinn[word] = score
    }
    save(afinn, 'afinn111.json');
}