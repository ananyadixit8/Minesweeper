
function makeGrid(rows, cols) {
    var arr = new Array(rows);
    for (var i = 0; i < rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}


var grid;
var w = 20;
var rows = Math.floor(400 / w);
var cols = Math.floor(400 / w);

function setup() {
    createCanvas(400, 400);

    grid = makeGrid(rows, cols);
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j] = new Cell(i * w, j * w, w);

        }
    }
}

function draw() {
    clear();
    
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            grid[i][j].show();
        }
    }
}